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
import { Trash } from "lucide-react";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { toast } from "sonner";
import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";
import {
  useDeleteDivisionMutation,
  useGetDivisionQuery,
} from "@/redux/features/division/division.api";
import type { IDivision } from "@/types";

export default function AddDivision() {
  const { data, isLoading } = useGetDivisionQuery(undefined);
  const [deleteDivision] = useDeleteDivisionMutation();

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteDivision(id).unwrap();
      toast.success(result.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data.message || error.data);
    }
  };

  console.log({data});
  return (
    <div className="w-full max-w-4xl mx-auto px-5 pb-4 border rounded-2xl">
      <div className="flex justify-between my-8 text-xl font-bold">
        <h1>Division</h1>
        <AddDivisionModal />
      </div>
      { !data?.length ? (
        <div className="text-2xl text-muted-foreground text-center">
          No data found to show!
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your all division.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              data?.length &&
              data?.map((item:IDivision, index: number) => (
                <TableRow key={index}>
                  <TableCell className="">{item.name}</TableCell>
                  <TableCell className="mr-auto border-x">{item.description}</TableCell>
                  <TableCell><img className="max-w-32 h-24 rounded-2xl m-2" src={item?.thumbnail} alt="" /></TableCell>
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
