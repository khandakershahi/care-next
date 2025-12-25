import Container from "@/components/shared/Container";
import React from "react";

const loading = () => {
  return (
    <div className="mt-6">
      <Container>
        <div className="h-[32px] mb-2 w-full bg-gray-200 animate-pulse" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(10)]?.map((_, ind) => {
            return (
              <div
                key={ind}
                className="overflow-hidden rounded-2xl border bg-gray-500 shadow-sm"
              >
                <div className="h-56 w-full bg-gray-200 animate-pulse" />
                <div className="space-y-4 p-6">
                  <div className="h-5 w-3/4 rounded bg-gray-200 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-gray-200 animate-pulse" />
                    <div className="h-3 w-11/12 rounded bg-gray-200 animate-pulse" />
                    <div className="h-3 w-10/12 rounded bg-gray-200 animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                    <div className="h-6 w-24 rounded bg-gray-200 animate-pulse" />
                  </div>
                  <div className="h-10 w-full rounded-xl bg-gray-300 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default loading;
