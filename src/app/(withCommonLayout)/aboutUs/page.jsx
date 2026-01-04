import Container from "@/components/shared/Container";
import { Heart, Shield, Users, Award, Clock, Target } from "lucide-react";

const AboutUsPage = () => {
  const values = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Trust & Safety",
      description: "All caregivers are thoroughly background-checked and verified with proper credentials."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Compassionate Care",
      description: "We believe in providing care with empathy, respect, and genuine compassion."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Professional Team",
      description: "Our caregivers are trained professionals dedicated to providing the best service."
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "24/7 Availability",
      description: "Round-the-clock support to ensure you get help whenever you need it."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold">About Care.xyz</h1>
            <p className="text-xl text-blue-100">
              Making quality caregiving accessible, secure, and reliable for every family.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                At Care.xyz, our mission is to connect families with trusted, professional caregivers 
                who provide exceptional care for children, elderly individuals, and those in need of 
                specialized support.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                We understand that finding the right caregiver is one of the most important decisions 
                a family can make. That's why we've built a platform that prioritizes safety, 
                reliability, and quality in every interaction.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whether you need temporary babysitting, long-term elderly care, or specialized medical 
                support at home, Care.xyz is here to make the process simple, secure, and stress-free.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop"
                alt="Caregiving Mission"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">What drives us to deliver excellence every day</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex justify-center text-blue-600 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Care.xyz?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Professionals</h3>
                  <p className="text-gray-600">
                    Every caregiver on our platform undergoes rigorous background checks, credential 
                    verification, and training to ensure they meet our high standards.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Matching</h3>
                  <p className="text-gray-600">
                    We help you find caregivers who match your specific needs, location, and schedule 
                    requirements for a perfect fit.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Platform</h3>
                  <p className="text-gray-600">
                    Our platform uses advanced security measures to protect your personal information 
                    and ensure safe, reliable bookings.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Booking</h3>
                  <p className="text-gray-600">
                    Book care services for hours, days, or long-term arrangements with transparent 
                    pricing and easy scheduling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Happy Families</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Verified Caregivers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Hours of Care</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutUsPage;
