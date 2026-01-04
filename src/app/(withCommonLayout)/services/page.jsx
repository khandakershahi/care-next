import React from "react";
import ServiceCard from "./_component/ServiceCard";
import Container from "@/components/shared/Container";
import { getAllServices } from "@/services/services.service";

export const metadata = {
  title: "Services | Care.xyz",
  description: "Browse our professional care services - Baby Care, Elderly Care, and Sick People Service",
};

const ServicesPage = async ({ searchParams }) => {
  const getParams = await searchParams;
  const servicesData = await getAllServices({ ...getParams });

  const services = servicesData?.data || [];

  return (
    <div className="my-4">
      <Container>
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Choose from our professional care services tailored to your family's needs
          </p>
        </div>

        {services?.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Please check back soon for available services</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service) => {
              return <ServiceCard service={service} key={service?._id} />;
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ServicesPage;
