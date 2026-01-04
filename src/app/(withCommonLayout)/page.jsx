import Link from "next/link";
import { Heart, Users, Clock, Shield, Star, ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";

const Homepage = () => {
  const services = [
    {
      id: 1,
      title: "Baby Care",
      description: "Professional and caring babysitters for your little ones. Available 24/7 with verified credentials.",
      icon: "👶",
      price: "Starting from $15/hour",
      features: ["Verified Caregivers", "24/7 Availability", "Emergency Support"]
    },
    {
      id: 2,
      title: "Elderly Service",
      description: "Compassionate care for seniors. Assistance with daily activities, medication, and companionship.",
      icon: "👴",
      price: "Starting from $18/hour",
      features: ["Trained Professionals", "Medical Assistance", "Companion Care"]
    },
    {
      id: 3,
      title: "Sick People Service",
      description: "Specialized care for individuals recovering from illness. Professional medical support at home.",
      icon: "🏥",
      price: "Starting from $20/hour",
      features: ["Medical Expertise", "Home Healthcare", "Recovery Support"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Working Mother",
      comment: "Care.xyz helped me find the perfect babysitter for my twins. The service is reliable and trustworthy!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Family Caregiver",
      comment: "Excellent elderly care service. My father receives the best care while I'm at work. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Healthcare Professional",
      comment: "Professional and caring staff. The booking process is seamless and the caregivers are well-trained.",
      rating: 5
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "5000+", label: "Happy Families" },
    { icon: <Heart className="w-8 h-8" />, value: "1000+", label: "Verified Caregivers" },
    { icon: <Clock className="w-8 h-8" />, value: "24/7", label: "Available Support" },
    { icon: <Shield className="w-8 h-8" />, value: "100%", label: "Background Checked" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero/Banner Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Trusted Care Services for Your Loved Ones
              </h1>
              <p className="text-xl text-blue-100">
                Find reliable and professional caregivers for children, elderly, and family members. 
                Book services easily and give your loved ones the care they deserve.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  Explore Services
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/aboutUs"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop"
                    alt="Caregiving"
                    className="rounded-2xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center text-blue-600">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">About Care.xyz</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Care.xyz is a trusted platform connecting families with professional caregivers. 
              Our mission is to make quality caregiving accessible, secure, and reliable for everyone.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you need a babysitter for your child, compassionate care for an elderly family member, 
              or professional support for someone recovering from illness, we're here to help. 
              All our caregivers are thoroughly verified, background-checked, and trained to provide 
              the highest standard of care.
            </p>
            <div className="flex justify-center gap-8 pt-8">
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto text-blue-600 mb-2" />
                <p className="font-semibold">100% Verified</p>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 mx-auto text-blue-600 mb-2" />
                <p className="font-semibold">Compassionate Care</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 mx-auto text-blue-600 mb-2" />
                <p className="font-semibold">24/7 Support</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Professional care services tailored to your family's needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-blue-600 font-semibold mb-4">{service.price}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from families we've helped</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">Ready to Find the Perfect Caregiver?</h2>
            <p className="text-xl text-blue-100">
              Join thousands of families who trust Care.xyz for reliable and professional care services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started Today
              </Link>
              <Link
                href="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Homepage;
