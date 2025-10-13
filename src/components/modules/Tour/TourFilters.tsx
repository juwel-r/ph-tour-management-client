import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";

export default function TourFilters() {
  const { data: divisionData, isLoading: divisionLoading } = useGetDivisionQuery();
  const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourTypeQuery({ limit: 1000,fields:"name,_id" });

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };

  const handleTourType = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleFilterReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    setSearchParams(params);
  };

  return (
    <div className="w-full col-span-3 border border-muted rounded-2xl p-4 mx-auto space-y-5">
      <div className="flex justify-between items-center pb-5">
        <h1>Filter</h1>
        <Button size="sm" variant={"outline"} onClick={handleFilterReset}>
          Clear
        </Button>
      </div>

      <Select
        disabled={divisionLoading}
        value={selectedDivision || ""}
        onValueChange={(value) => handleDivisionChange(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Division" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Division</SelectLabel>
            {!divisionLoading &&
              divisionData?.length &&
              divisionData?.map((division) => (
                <SelectItem key={division._id} value={division._id}>
                  {division.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        disabled={tourTypeLoading}
        value={selectedTourType || ""}
        onValueChange={handleTourType}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Tour Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tour Type</SelectLabel>
            {!tourTypeLoading &&
              tourTypeData?.data.length &&
              tourTypeData?.data.map((tourType) => (
                <SelectItem key={tourType._id} value={tourType._id}>
                  {tourType.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
