import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteTourTypeMutation,
  useGetTourTypeQuery,
} from "@/redux/features/tour/tour.api";
import { Trash } from "lucide-react";
import { AddTourTypeModal } from "../../../components/modules/Admin/TourType/AddTourTypeModal";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import type { ITourType } from "@/types/tourType.types";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddTourType() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading } = useGetTourTypeQuery({ page: currentPage, limit });
  const [deleteTourType] = useDeleteTourTypeMutation();

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteTourType(id).unwrap();
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message || error.data);
    }
  };

  const totalPage: number = data?.meta?.totalPage ?? 0;
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1);
  //"(_,i) here _ is value and i is index, this _ is undefined so return index+1"

  // const pages = [...Array(totalPage).keys()]; // //another option, but it will show index number and start from "0"
  console.log(currentPage);

  return (
    <div className="w-full max-w-4xl mx-auto px-5 pb-4 border rounded-2xl">
      <div className="flex justify-between my-8 text-xl font-bold">
        <h1>Tour Types</h1>
        <AddTourTypeModal />
      </div>
      {!data?.data.length ? (
        <div className="text-2xl text-muted-foreground text-center">
          No data found to show!
        </div>
      ) : (
        <Table>
          {/* <TableCaption>A list of all tour types.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              data?.data?.length &&
              data!.data?.map((item: ITourType, index: number) => (
                <TableRow key={index}>
                  <TableCell className="w-full">{item.name}</TableCell>
                  <TableCell>
                    <DeleteConfirmation
                      onConfirm={() => handleDelete(item._id)}
                    >
                      <Button size="sm">
                        <Trash />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      {totalPage! > 1 && (
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={cn("", {
                    "pointer-events-none opacity-50": currentPage <= 1,
                  })}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                {pages!.map((page) => (
                  <PaginationLink
                    // className={currentPage === page ? "border bg-muted" : ""}
                    isActive = {currentPage ===page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                ))}
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={cn("", {
                    "pointer-events-none opacity-50": currentPage >= totalPage!,
                  })}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                />
              </PaginationItem>
            </PaginationContent>
            <Select
              onValueChange={(value) => {
                setLimit(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Pagination>
        </div>
      )}
    </div>
  );
}
