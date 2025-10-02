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
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { Trash } from "lucide-react";
import { AddTourModal } from "../../../components/modules/Admin/TourType/AddTourModal";

export default function AddTourType() {
  const { data, isLoading } = useGetTourTypeQuery(undefined);
  console.log(data, isLoading);
  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1>Tour Types</h1>
        <AddTourModal/>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data!.map((item: { name: string }, index: number) => (
              <TableRow key={index}>
                <TableCell className="w-full">{item.name}</TableCell>
                <TableCell>
                  <Button size="sm">
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
