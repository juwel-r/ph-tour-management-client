import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
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
import type { ITour } from "@/types/tour.types";
import { toast } from "sonner";

export default function AddTourType() {
  const { data, isLoading } = useGetTourTypeQuery(undefined);
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

  return (
    <div className="w-full max-w-4xl mx-auto px-5 pb-4 border rounded-2xl">
      <div className="flex justify-between my-8 text-xl font-bold">
        <h1>Tour Types</h1>
        <AddTourTypeModal />
      </div>
      {!data?.length ? (
        <div className="text-2xl text-muted-foreground text-center">
          No data found to show!
        </div>
      ) : (
        <Table>
          <TableCaption>A list of all tour types.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              data?.length &&
              data!.map((item: ITour, index: number) => (
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
    </div>
  );
}
