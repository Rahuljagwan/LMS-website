import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]); //state lifting up

  const [sortByPrice, setSortByPrice] = useState(""); //state lifting up

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">result for "{query}"</h1>
        <p>
          Showing results for{""}
          <span className="text-blue-800 font-bold italic">{query}</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange} />
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};

// const CourseSkeleton = () => {
//   return (
//     <div className="flex flex-col md:flex-row gap-4 border-b border-gray-300 py-4 animate-pulse">
//       {/* Course Image Skeleton */}
//       <div className="h-32 w-full md:w-64 bg-gray-200 rounded-md"></div>

//       {/* Course Info Skeleton */}
//       <div className="flex flex-col gap-4 flex-1 px-4">
//         {/* Course Title */}
//         <div className="h-6 w-3/4 bg-gray-200 rounded-md"></div>
//         {/* Course Subtitle */}
//         <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
//         {/* Ratings & Additional Info */}
//         <div className="flex items-center gap-2">
//           <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
//           <div className="h-4 w-10 bg-gray-200 rounded-full"></div>{" "}
//           {/* Star Icon Placeholder */}
//         </div>
//         {/* Price Skeleton */}
//         <div className="h-6 w-20 bg-gray-200 rounded-md mt-2"></div>
//       </div>

//       {/* Button and Icon Skeleton */}
//       <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
//         <div className="h-6 w-12 bg-gray-200 rounded-md"></div>
//         <div className="h-6 w-6 bg-gray-200 rounded-full mt-2"></div>{" "}
//         {/* Icon Placeholder */}
//       </div>
//     </div>
//   );
// };

const CourseSkeleton = () => {
  return (
    <>
      <style>
        {`
          @keyframes loading {
            0% {
              background-position: 200%;
            }
            100% {
              background-position: -200%;
            }
          }

          .animate-loading {
            background-size: 200% 100%;
            background-position: 200%;
            animation: loading 1.5s infinite linear;
          }
        `}
      </style>

      <div className="flex flex-col md:flex-row gap-4 border-b border-gray-300 py-4 animate-pulse">
        {/* Course Image Skeleton */}
        <div className="h-32 w-full md:w-64 bg-gray-200 rounded-md relative">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white to-transparent animate-loading"></div>
        </div>

        {/* Course Info Skeleton */}
        <div className="flex flex-col gap-4 flex-1 px-4">
          {/* Course Title */}
          <div className="h-6 w-3/4 bg-gray-200 rounded-md relative">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white to-transparent animate-loading"></div>
          </div>
          {/* Course Subtitle */}
          <div className="h-4 w-1/2 bg-gray-200 rounded-md relative">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white to-transparent animate-loading"></div>
          </div>
          {/* Ratings & Additional Info */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-1/3 bg-gray-200 rounded-md relative">
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white to-transparent animate-loading"></div>
            </div>
            <div className="h-4 w-10 bg-gray-200 rounded-full relative">
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white to-transparent animate-loading"></div>
            </div>
          </div>
          {/* Price Skeleton */}
          <div className="h-6 w-20 bg-gray-200 rounded-md relative">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white to-transparent animate-loading"></div>
          </div>
        </div>

        {/* Button and Icon Skeleton */}
        <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
          <div className="h-6 w-12 bg-gray-200 rounded-md relative">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white to-transparent animate-loading"></div>
          </div>
          <div className="h-6 w-6 bg-gray-200 rounded-full mt-2 relative">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white to-transparent animate-loading"></div>
          </div>
        </div>
      </div>
    </>
  );
};
