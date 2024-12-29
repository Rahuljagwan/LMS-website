import { Button } from "@/components/ui/button";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  console.log("data", data);
  const navigate = useNavigate();

  if (isLoading) {
    <CourseListSkeleton />;
  }

  return (
    <div>
      <Button onClick={() => navigate(`create`)} className="mb-5">
        Create a new Course
      </Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                <Badge>{course?.isPublished ? "Published" : "Draft"}</Badge>
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;

const CourseListSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-40" /> {/* Button Skeleton */}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/2" /> {/* Table Caption Skeleton */}
        <div className="space-y-2">
          {/* Table Header Skeleton */}
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
          {/* Table Rows Skeleton */}
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between space-y-2"
              >
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-24 text-right" />
              </div>
            ))}
          {/* Table Footer Skeleton */}
          <div className="flex justify-between">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-24 text-right" />
          </div>
        </div>
      </div>
    </div>
  );
};
