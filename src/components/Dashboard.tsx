import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Plane, Wallet, MapPin, Calendar, Users, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const features = [
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Expense Tracking",
      description: "Easily track all your travel expenses in one place"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Trip Management",
      description: "Organize expenses by trip and destination"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Budget Planning",
      description: "Set and manage your travel budget effectively"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Group Splitting",
      description: "Split expenses with travel companions easily"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-800 text-lime-400 mb-6 border-lime-400 border-2">
          <Plane className="h-5 w-5 mr-2" />
          <span className="font-medium">Introducing RajEvents</span>
        </div>
        
        <h1 className="text-7xl lg:text-8xl font-bold text-white mb-6">
          Travel Smarter<br />
          <span className="text-lime-400">Spend Wiser</span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Your ultimate companion for effortlessly tracking and managing all your travel expenses in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          {/* <Button className="rounded-full px-8 py-6 text-lg font-medium bg-lime-500 hover:bg-lime-600 text-gray-900">
            Get Started - It's Free
          </Button>
          <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-medium text-lime-400 border-lime-400 hover:bg-gray-800">
            Learn More
          </Button> */}
        </div>
        
        <div className="relative">
          <Card className="rounded-2xl shadow-xl overflow-hidden border border-gray-700 bg-white">
            <div className="absolute inset-0  rounded-2xl"></div>
            <div className="relative p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                <div className="lg:w-2/5">
                  <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">Why Choose RajEvents?</h2>
                  <p className="text-gray-700 text-sm sm:text-base">
                    RajEvents simplifies travel expense management with an intuitive interface and powerful features 
                    designed specifically for travelers who want to stay on top of their spending.
                  </p>
                </div>
                <div className="lg:w-3/5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {features.map((feature, index) => (
                      <Card key={index} className="p-3 sm:p-4 rounded-lg bg-gray-700 border border-gray-700 hover:border-lime-400/30 transition-colors h-full">
                        <div className="flex flex-col items-center h-full">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center text-lime-400 mb-2 sm:mb-3">
                            {feature.icon}
                          </div>
                          <h3 className="font-semibold text-white mb-1 text-center text-xs sm:text-sm">{feature.title}</h3>
                          <p className="text-xs text-gray-400 text-center">{feature.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your travel experience?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who manage their expenses effortlessly with RajEvents.
          </p>
          <Button className="rounded-full px-8 py-6 text-lg font-medium bg-lime-500 hover:bg-lime-600 text-gray-900 font-bold">
            Start Now!
          </Button>
        </div>
      </div>
    </div>
  );
}
