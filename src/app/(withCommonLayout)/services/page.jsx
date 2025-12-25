import React from "react";
import Container from "@/components/shared/Container";

const ServicesPage = async ({ searchParams }) => {
  const getParams = await searchParams;

  return (
    <div className="my-4">
      <Container>
        <h2 className="font-bold text-3xl text-purple-500 mb-4">
          Services Page
        </h2>
        <div className="text-center py-20">
          <p className="text-gray-600">Services content will be added here</p>
        </div>
      </Container>
    </div>
  );
};

export default ServicesPage;
