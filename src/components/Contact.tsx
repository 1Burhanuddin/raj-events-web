import { MapPin, Phone, Mail, Globe, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

export const Contact = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="mb-6 h-12 w-32 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-lime-300 rounded-full transition-colors"
          aria-label="Go back"
          type="button"
        >
          <ArrowLeft className="h-5 w-5 text-white" /> 
          <span className="text-white font-medium">Back</span>
        </button>
        
        <Card className="w-full shadow-xl border-0 rounded-2xl overflow-hidden">
          <div className="bg-lime-400 px-6 py-4">
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Contact Us
            </CardTitle>
          </div>
          <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8 h-full">
            {/* Company Information */}
            <div className="space-y-6 h-full">
              <div className="flex items-start space-x-4">
                <div className="bg-lime-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-lime-700" />
                </div>
                <div className="w-full">
                  <div className="border-b-2 border-lime-400 pb-2 mb-1">
                    <h3 className="text-lg font-semibold">Our Office</h3>
                  </div>
                  <address className="not-italic text-gray-600 pt-2">
                    <p>Raj Information Systems Pvt Ltd</p>
                    <p>141/145 Princess Street,</p>
                    <p>Hatim Manzil, Office# 3</p>
                    <p>3rd floor Kalbadevi, next to Bank of India</p>
                    <p>Mumbai 400 002</p>
                    <p>Maharashtra, India</p>
                  </address>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-lime-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-lime-700" />
                </div>
                <div className="w-full">
                  <div className="border-b-2 border-lime-400 pb-2 mb-1">
                    <h3 className="text-lg font-semibold">Phone</h3>
                  </div>
                  <div className="pt-2">
                    <a href="tel:022-49735253" className="text-gray-600 hover:text-lime-600 transition-colors">
                      022-49735253
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-lime-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-lime-700" />
                </div>
                <div className="w-full">
                  <div className="border-b-2 border-lime-400 pb-2 mb-1">
                    <h3 className="text-lg font-semibold">Email</h3>
                  </div>
                  <div className="pt-2">
                    <a href="mailto:info@rajinfosys.net" className="text-gray-600 hover:text-lime-600 transition-colors">
                      info@rajinfosys.net
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-lime-100 p-3 rounded-full">
                  <Globe className="h-6 w-6 text-lime-700" />
                </div>
                <div className="w-full">
                  <div className="border-b-2 border-lime-400 pb-2 mb-1">
                    <h3 className="text-lg font-semibold">Website</h3>
                  </div>
                  <div className="pt-2">
                    <a 
                      href="http://www.rajinfosys.net" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-lime-600 transition-colors"
                    >
                      http://www.rajinfosys.net
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-lime-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-lime-700" />
                </div>
                <div className="w-full">
                  <div className="border-b-2 border-lime-400 pb-2 mb-1">
                    <h3 className="text-lg font-semibold">GST Number</h3>
                  </div>
                  <div className="pt-2">
                    <p className="text-gray-600">27AACCR8505J1Z6</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col h-full">
              
              <form className="space-y-6">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="mt-1 h-14 text-base px-4 py-3 border-gray-300 focus:border-lime-400 rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1 h-14 text-base px-4 py-3 border-gray-300 focus:border-lime-400 rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      className="mt-1 h-14 text-base px-4 py-3 border-gray-300 focus:border-lime-400 rounded-xl"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full mt-1 px-4 py-3 text-base border border-gray-300 rounded-xl focus:border-lime-400 focus:ring-0"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-lime-400 hover:bg-lime-600 text-white text-base font-medium rounded-xl"
                >
                  Send Message
                </Button>
              </form>
            </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
