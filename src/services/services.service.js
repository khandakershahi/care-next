"use server";

export const getSingleService = async (id) => {
  const res = await fetch(
    `https://care-api.example.com/api/v1/services/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return res.json();
};

export const getAllServices = async (searchParams) => {
  const getParams = new URLSearchParams(searchParams).toString();
  console.log(getParams);

  const res = await fetch(
    `https://care-api.example.com/api/v1/services?${getParams}`,
    {
      cache: "force-cache",
    }
  );

  const data = await res.json();
  return data;
};
