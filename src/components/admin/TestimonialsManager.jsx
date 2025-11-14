import { useState, useEffect } from 'react';
import { Star, Plus, Trash2, Edit, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dataService } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingReviews, setPendingReviews] = useState([]);
  const { toast } = useToast();

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxRFI9NeCybnqS2Dus3otNpeVpb9WXGE_CTc1Uz5gYAtJgFIayTy85gUfgsOKWrTTIeMw/exec';

  const emptyReview = {
    name: '',
    location: '',
    rating: 5,
    review: '',
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(emptyReview);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    setTestimonials(dataService.getTestimonials());
  };

  const fetchGoogleFormResponses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success === false) {
        throw new Error(data.message || 'Failed to fetch reviews');
      }
      
      if (data.reviews && data.reviews.length > 0) {
        // Filter only 4-5 star reviews that aren't already added
        const existingNames = testimonials.map(t => t.name.toLowerCase());
        const newReviews = data.reviews.filter(review => 
          review.rating >= 4 && !existingNames.includes(review.name.toLowerCase())
        );
        
        setPendingReviews(newReviews);
        toast({
          title: "Reviews Fetched Successfully!",
          description: `Found ${newReviews.length} new 4-5 star reviews from Google Form`,
        });
      } else {
        toast({
          title: "No New Reviews",
          description: "No new 4-5 star reviews found in Google Form responses",
        });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Setup Required",
        description: "Please deploy the Google Apps Script first. Check the instructions below.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const approveReview = (review) => {
    const reviewData = {
      name: review.name,
      location: review.location,
      rating: parseInt(review.rating),
      review: review.review,
      date: review.date || new Date().toISOString().split('T')[0]
    };
    
    dataService.saveTestimonial(reviewData);
    toast({
      title: "Review Approved",
      description: "Review has been added to your website",
    });
    
    setPendingReviews(pendingReviews.filter(r => r.name !== review.name));
    loadTestimonials();
  };

  const rejectReview = (review) => {
    setPendingReviews(pendingReviews.filter(r => r.name !== review.name));
    toast({
      title: "Review Rejected",
      description: "Review has been removed from pending list",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingReview) {
      // Update existing review
      const allReviews = dataService.getTestimonials();
      const index = allReviews.findIndex(r => r.id === editingReview.id);
      if (index !== -1) {
        allReviews[index] = {
          ...formData,
          id: editingReview.id,
          rating: parseInt(formData.rating)
        };
        localStorage.setItem('cv_testimonials', JSON.stringify(allReviews));
      }
    } else {
      // Add new review
      const reviewData = {
        ...formData,
        rating: parseInt(formData.rating)
      };
      dataService.saveTestimonial(reviewData);
    }
    
    toast({
      title: editingReview ? "Review Updated" : "Review Added",
      description: "Customer review has been saved successfully.",
    });
    
    loadTestimonials();
    setIsDialogOpen(false);
    setFormData(emptyReview);
    setEditingReview(null);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      location: review.location,
      rating: review.rating,
      review: review.review,
      date: review.date
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this review?')) {
      dataService.deleteTestimonial(id);
      toast({
        title: "Review Deleted",
        description: "Customer review has been removed successfully.",
      });
      loadTestimonials();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Customer Reviews</h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            Fetch and approve reviews from Google Form (4+ stars auto-appear on homepage)
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Button onClick={fetchGoogleFormResponses} disabled={isLoading} variant="outline" size="sm" className="w-full sm:w-auto">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-xs md:text-sm">{isLoading ? 'Fetching...' : 'Fetch New Reviews'}</span>
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingReview(null); setFormData(emptyReview); }} size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                <span className="text-xs md:text-sm">Add Manually</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingReview ? 'Edit' : 'Add New'} Customer Review</DialogTitle>
                <DialogDescription>
                  Manually add a review if needed
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Customer Name*</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="e.g., Ramesh Kumar"
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location*</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange} 
                      placeholder="e.g., Coimbatore"
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating">Rating (1-5 stars)*</Label>
                    <Input 
                      id="rating" 
                      name="rating" 
                      type="number" 
                      min="1" 
                      max="5" 
                      value={formData.rating} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Review Date*</Label>
                    <Input 
                      id="date" 
                      name="date" 
                      type="date" 
                      value={formData.date} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="review">Review Text*</Label>
                  <Textarea 
                    id="review" 
                    name="review" 
                    value={formData.review} 
                    onChange={handleChange} 
                    placeholder="Customer's feedback..."
                    rows={4}
                    required 
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">
                    {editingReview ? 'Update' : 'Add'} Review
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Instruction Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white p-2 rounded-full flex-shrink-0">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">Setup Google Apps Script (Required)</h3>
              <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                <li>Open your <a href="https://docs.google.com/forms" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Google Form responses in Sheets</a></li>
                <li>Click <strong>Extensions</strong> → <strong>Apps Script</strong></li>
                <li>Copy code from <code className="bg-blue-100 px-1 py-0.5 rounded">google-apps-script.js</code> file in project root</li>
                <li>Paste in Apps Script editor, click <strong>Deploy</strong> → <strong>New deployment</strong></li>
                <li>Select type: <strong>Web app</strong>, Execute as: <strong>Me</strong>, Access: <strong>Anyone</strong></li>
                <li>Copy the Web App URL and update line 20 in this file</li>
                <li>Click <strong>"Fetch New Reviews"</strong> button above!</li>
              </ol>
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-xs text-yellow-800">
                  ⚠️ <strong>Current Status:</strong> Script URL may not be deployed yet. Follow steps above to activate.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews Section */}
      {pendingReviews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Pending Reviews ({pendingReviews.length})</h3>
            <p className="text-sm text-muted-foreground">Approve or reject reviews from Google Form</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {pendingReviews.map((review, index) => (
              <Card key={index} className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.location}</span>
                      </div>
                    </div>
                    <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                      NEW
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic mb-4">"{review.review}"</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => approveReview(review)} className="flex-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => rejectReview(review)} className="flex-1">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Published Reviews Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Published Reviews ({testimonials.length})</h3>
        <div className="grid md:grid-cols-2 gap-4">
        {testimonials.length === 0 ? (
          <Card className="col-span-full p-8 text-center">
            <CardContent>
              <Star className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No published reviews yet. Click "Fetch New Reviews" to load from Google Form!</p>
            </CardContent>
          </Card>
        ) : (
          testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{testimonial.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(testimonial)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{testimonial.review}"</p>
                <p className="text-xs text-muted-foreground mt-2">{testimonial.date}</p>
                {testimonial.rating >= 4 && (
                  <div className="mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      ✓ Shown on Homepage
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
        </div>
      </div>
    </div>
  );
}
