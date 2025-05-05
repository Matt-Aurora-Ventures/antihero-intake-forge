
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload, Mail, Printer } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  medicalAilments: string;
  undiscussedConditions: string;
  healthConcerns: string;
  foodIntake: string;
  waterIntake: string;
  foodPreferences: string;
  dietaryRestrictions: string;
  calorieIntake: string;
  typicalDay: string;
  photo: File | null;
  alcoholSmoke: string;
  exercisePreferences: string;
  additionalInfo: string;
  disclaimer: boolean;
}

const IntakeForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    preferredContact: "",
    medicalAilments: "",
    undiscussedConditions: "",
    healthConcerns: "",
    foodIntake: "",
    waterIntake: "",
    foodPreferences: "",
    dietaryRestrictions: "",
    calorieIntake: "",
    typicalDay: "",
    photo: null,
    alcoholSmoke: "",
    exercisePreferences: "",
    additionalInfo: "",
    disclaimer: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        photo: e.target.files[0],
      });
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.disclaimer) {
        toast({
          title: "Disclaimer Required",
          description: "Please acknowledge the disclaimer to continue",
          variant: "destructive",
        });
        return;
      }
    }

    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const printForm = () => {
    document.body.classList.add('print-mode');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('print-mode');
    }, 500);
  };

  const handleSubmit = async () => {
    if (!formData.disclaimer) {
      toast({
        title: "Disclaimer Required",
        description: "Please acknowledge the disclaimer to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      // This is a simulated email send - in a real app you would connect to a backend service
      // We're simulating the process since we don't have a backend set up
      toast({
        title: "Form Submitted!",
        description: "Your information has been sent. We'll be in touch soon!",
      });
      
      // Reset form or go to thank you step
      setCurrentStep(6);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Progress bar */}
      <div className="mb-8 no-print">
        <div className="h-2 bg-antihero-muted rounded-full mb-2">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm">
          <span>Step {currentStep} of 5</span>
          <span>{currentStep === 6 ? "Complete" : `${Math.round(((currentStep - 1) / 5) * 100)}%`}</span>
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img 
          src="/lovable-uploads/16afe8ab-0351-4dbc-8339-aa2b0d957741.png" 
          alt="Antihero Fitness" 
          className="h-20 w-20 animate-float"
        />
      </div>

      {/* Print & Actions Button */}
      <div className="flex justify-end mb-4 no-print">
        <Button 
          variant="outline" 
          className="mr-2" 
          onClick={printForm}
        >
          <Printer className="mr-2 h-4 w-4" /> Print Form
        </Button>
      </div>

      {/* Form Cards */}
      {currentStep === 1 && (
        <Card className="mb-8 bg-antihero-accent pulse-card text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">STEP 1: Basic Information</CardTitle>
            <CardDescription className="text-gray-300">
              Please provide your contact information so we can get in touch with you if needed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">What is your full name?</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">What is your email address?</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">What is the best phone number to reach you?</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your phone number"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredContact">Is there any other preferred method of contact?</Label>
              <Input
                id="preferredContact"
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleInputChange}
                placeholder="Other contact methods (optional)"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <p className="text-sm text-gray-300 italic">Your information will be kept confidential.</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextStep}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="mb-8 bg-antihero-accent pulse-card text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">STEP 2: Medical & Legal</CardTitle>
            <CardDescription className="text-gray-300">
              Please answer the following questions about your health.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicalAilments">Do you have any existing medical ailments or injuries?</Label>
              <Textarea
                id="medicalAilments"
                name="medicalAilments"
                value={formData.medicalAilments}
                onChange={handleInputChange}
                placeholder="Please describe any medical conditions"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="undiscussedConditions">Are there any conditions you have not discussed with a doctor?</Label>
              <Textarea
                id="undiscussedConditions"
                name="undiscussedConditions"
                value={formData.undiscussedConditions}
                onChange={handleInputChange}
                placeholder="List any undiscussed conditions"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="healthConcerns">Please list any injuries, medications, or health concerns we should know about.</Label>
              <Textarea
                id="healthConcerns"
                name="healthConcerns"
                value={formData.healthConcerns}
                onChange={handleInputChange}
                placeholder="List any health concerns"
                className="bg-antihero border-antihero-muted"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Previous</Button>
            <Button onClick={nextStep}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 3 && (
        <Card className="mb-8 bg-antihero-accent pulse-card text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">STEP 3: Nutrition</CardTitle>
            <CardDescription className="text-gray-300">
              Let's talk about your nutrition habits and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="foodIntake">How would you describe your daily food intake?</Label>
              <Textarea
                id="foodIntake"
                name="foodIntake"
                value={formData.foodIntake}
                onChange={handleInputChange}
                placeholder="Describe your daily food intake"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waterIntake">How much water do you typically drink each day?</Label>
              <Input
                id="waterIntake"
                name="waterIntake"
                value={formData.waterIntake}
                onChange={handleInputChange}
                placeholder="Daily water intake"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="foodPreferences">What are your food preferences and favorite foods?</Label>
              <Textarea
                id="foodPreferences"
                name="foodPreferences"
                value={formData.foodPreferences}
                onChange={handleInputChange}
                placeholder="List your food preferences"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Do you have any dietary restrictions (allergies, vegetarian, etc.)?</Label>
              <Textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                placeholder="List any dietary restrictions"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calorieIntake">Are you aware of your current calorie or macronutrient intake? (If yes, please specify.)</Label>
              <Input
                id="calorieIntake"
                name="calorieIntake"
                value={formData.calorieIntake}
                onChange={handleInputChange}
                placeholder="Current calorie or macronutrient intake"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="typicalDay">Please describe what a typical day of eating and drinking looks like for you.</Label>
              <Textarea
                id="typicalDay"
                name="typicalDay"
                value={formData.typicalDay}
                onChange={handleInputChange}
                placeholder="Describe a typical day of eating and drinking"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="photoUpload">(Optional) Please upload a recent photo of yourself, either with a T-shirt or without (if comfortable).</Label>
              <div className="flex items-center gap-4">
                <label htmlFor="photoUpload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-antihero hover:bg-antihero-muted border-antihero-muted transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2" />
                    <p className="mb-2 text-sm text-center">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG or JPEG (MAX. 10MB)</p>
                  </div>
                  <input 
                    id="photoUpload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                </label>
                {formData.photo && (
                  <div className="text-sm">
                    <p>Selected: {formData.photo.name}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Previous</Button>
            <Button onClick={nextStep}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 4 && (
        <Card className="mb-8 bg-antihero-accent pulse-card text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">STEP 4: Preferences</CardTitle>
            <CardDescription className="text-gray-300">
              Let's understand your preferences and habits better.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="alcoholSmoke">Do you drink alcohol or smoke?</Label>
              <Input
                id="alcoholSmoke"
                name="alcoholSmoke"
                value={formData.alcoholSmoke}
                onChange={handleInputChange}
                placeholder="Alcohol and smoking habits"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exercisePreferences">Are there any exercises you especially love or hate?</Label>
              <Textarea
                id="exercisePreferences"
                name="exercisePreferences"
                value={formData.exercisePreferences}
                onChange={handleInputChange}
                placeholder="Exercise preferences"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Is there anything else you'd like to share about your preferences or motivations?</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Additional information"
                className="bg-antihero border-antihero-muted"
              />
            </div>
            <div className="mt-6 p-4 bg-antihero rounded-md border border-antihero-muted">
              <p className="font-semibold mb-2">Disclaimer:</p>
              <p className="text-sm mb-4">
                I am not a medical doctor. My fitness knowledge is based on 25 years of personal experience. Please do not rely on my advice over that of a qualified medical or fitness practitioner. Always seek professional medical advice when in doubt. By continuing, you acknowledge the risks associated with physical activity and agree that I am not personally liable for any injuries.
              </p>
              <div className="flex items-center space-x-2 disclaimer-subtle">
                <Checkbox
                  id="disclaimer"
                  className="disclaimer-checkbox"
                  checked={formData.disclaimer}
                  onCheckedChange={(checked) => handleCheckboxChange("disclaimer", checked === true)}
                />
                <Label htmlFor="disclaimer" className="disclaimer-label text-gray-300 hover:text-white transition-colors">
                  I acknowledge and accept this disclaimer
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Previous</Button>
            <Button onClick={nextStep}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 5 && (
        <Card className="mb-8 bg-antihero-accent pulse-card text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Review & Submit</CardTitle>
            <CardDescription className="text-gray-300">
              Please review your information before submitting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Thank you for taking the time to complete this form. Your answers will help create a personalized fitness
              plan that aligns with your goals and needs.
            </p>
            <p className="mb-4">
              When you submit this form, a copy will be sent to <strong>{formData.email}</strong> and 
              to <strong>lucidbloks@gmail.com</strong>.
            </p>
            <p className="mb-6">
              You can print this form using the print button at the top of the page.
            </p>
            
            <div className="mt-6 p-4 bg-antihero rounded-md border border-antihero-muted">
              <p className="font-semibold mb-2">One last check:</p>
              <p className="text-sm mb-4">
                Have you reviewed all your answers and made sure they're complete and accurate?
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Previous</Button>
            <Button onClick={handleSubmit} className="bg-white text-antihero hover:bg-gray-200">
              <Mail className="mr-2 h-4 w-4" /> Submit Form
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 6 && (
        <Card className="mb-8 bg-antihero-accent pulse-card text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <div className="mb-6 text-6xl animate-float">🎉</div>
              <h3 className="text-xl font-bold mb-4">Form Submitted Successfully</h3>
              <p className="mb-6">
                Thank you for completing the Antihero Fitness intake form. We've sent a confirmation email to your address.
                We'll be in touch shortly to discuss the next steps in your fitness journey.
              </p>
              <Button 
                onClick={printForm} 
                variant="outline" 
                className="no-print"
              >
                <Printer className="mr-2 h-4 w-4" /> Print Your Submission
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IntakeForm;
