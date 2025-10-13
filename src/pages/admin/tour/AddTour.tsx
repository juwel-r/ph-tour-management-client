/* eslint-disable @typescript-eslint/no-explicit-any */
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import {
  useAddTourMutation,
  useGetTourTypeQuery,
} from "@/redux/features/tour/tour.api";
import { addTourSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { format, formatISO } from "date-fns";
import { CalendarIcon, Trash } from "lucide-react";
import { useState } from "react";
import {
  useFieldArray,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

export function AddTour() {
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypeQuery({ limit: 1000,fields:"name,_id" });
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const [addTour, { isLoading }] = useAddTourMutation();

  const form = useForm<z.infer<typeof addTourSchema>>({
    resolver: zodResolver(addTourSchema),
    defaultValues: {
      title: "",
      division: "",
      tourType: "",
      endDate: new Date(),
      startDate: new Date(),
      costFrom: "",
      maxGuest: "",
      description: "",
      included: [{ value: "" }],
      excluded: [{ value: "" }],
      amenities: [{ value: "" }],
      tourPlane: [{ value: "" }],
      location: "",
      arrivalLocation: "",
      departureLocation: "",
      minAge: "",
    },
  });

  const { fields, append, remove } = useFieldArray<
    z.infer<typeof addTourSchema>
  >({
    control: form.control,
    name: "included",
  });

  const {
    fields: excludedFields,
    append: excludedAppend,
    remove: excludedRemove,
  } = useFieldArray<z.infer<typeof addTourSchema>>({
    control: form.control,
    name: "excluded",
  });

  const {
    fields: amenitiesFields,
    append: amenitiesAppend,
    remove: amenitiesRemove,
  } = useFieldArray<z.infer<typeof addTourSchema>>({
    control: form.control,
    name: "amenities",
  });

  const {
    fields: tourPlaneFields,
    append: tourPlaneAppend,
    remove: tourPlaneRemove,
  } = useFieldArray<z.infer<typeof addTourSchema>>({
    control: form.control,
    name: "tourPlane",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log({ excludedFields });
    try {
      const tourData = {
        ...data,
        startDate: formatISO(data.startDate),
        endDate: formatISO(data.endDate),
        costFrom: Number(data.costFrom),
        maxGuest: Number(data.maxGuest),
        minAge: Number(data.minAge),
        included: data?.included?.map((obj: { value: string }) => obj.value),
        excluded: data?.excluded?.map((obj: { value: string }) => obj.value),
        amenities: data?.amenities?.map((obj: { value: string }) => obj.value),
        tourPlane: data?.tourPlane?.map((obj: { value: string }) => obj.value),
      };

      console.log(tourData);

      const formData = new FormData();
      formData.append("data", JSON.stringify(tourData));
      images.forEach((image) => formData.append("files", image as File));

      const result = await addTour(formData).unwrap();
      toast.success(result.message);

      form.reset();
      setImages([]);
    } catch (error: any) {
      toast.error(error?.data?.message || error.data);
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Tour</CardTitle>
        <CardDescription>
          Add new tour to our server for our visitors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="add-tour"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Tour Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropdown */}
            <div className="md:flex gap-4 sm:space-y-5 md:space-y-0">
              {/* Division */}

              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Select a Division</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={divisionLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Division" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {divisionData?.map(
                          (item: { _id: string; name: string }) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tour Type */}
              <FormField
                control={form.control}
                name="tourType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Select Tour Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={tourTypeLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Tour Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tourTypeData?.data?.map((item) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* departureLocation and arrivalLocation */}
            <div className="flex gap-5 sm:space-y-5 md:space-y-0">
              <FormField
                control={form.control}
                name="departureLocation"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Departure Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Departure Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrivalLocation"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Arrival Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Arrival Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Start date and end date */}
            <div className="md:flex gap-5 sm:space-y-5 md:space-y-0">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                          //disabled={(date) => date < new Date()} => jegula ajket date ar theke boro just segula available hobe so.. new Date() ar vitor akta date neya  hoice setar modde date get kore then 1 minus kora hoice
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>End Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location and Tour Cost */}
            <div className="flex gap-5 sm:space-y-5 md:space-y-0">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Tour Location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="costFrom"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      <Input placeholder="Tour Cost" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* minAge and maxGuest */}
            <div className="flex gap-5 sm:space-y-5 md:space-y-0">
              <FormField
                control={form.control}
                name="minAge"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Minimum Age</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Minimum Required Age"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Max Guest */}
              <FormField
                control={form.control}
                name="maxGuest"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Maximum Guest</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Maximum Guest allowed"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tour Description and photo upload */}
            <div className="md:flex gap-5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-5 flex-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tour description"
                        {...field}
                        className="min-h-[190px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <MultipleImageUploader onChange={setImages} />
            </div>

            <div className="border-t bg-muted"></div>

            {/* === Dynamic Fields === */}
            <>
              <div className="md:flex justify-center space-y-2 gap-3">
                {/* Includes Fields */}
                <div className="flex-1 w-full border p-4 rounded-2xl">
                  <Button
                    type="button"
                    className="my-4"
                    onClick={() => append({ value: "" })}
                  >
                    Add Includes
                  </Button>
                  <div className="sm:grid grid-cols-2 gap-5 space-y-2">
                    {fields.map(
                      (field: { value: string; id: string }, index: number) => (
                        <div className="flex gap-2 items-center">
                          <FormField
                            key={field.id}
                            control={form.control}
                            name={`included.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder="Includes..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            onClick={() => remove(index)}
                            type="button"
                            variant="default"
                            size="icon"
                          >
                            <Trash />
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Excludes Fields */}
                <div className="flex-1 w-full border p-4 rounded-2xl">
                  <Button
                    type="button"
                    className="my-4"
                    onClick={() => excludedAppend({ value: "" })}
                  >
                    Add Excludes
                  </Button>
                  <div className="sm:grid grid-cols-2 gap-5 space-y-2">
                    {excludedFields.map(
                      (field: { value: string; id: string }, index: number) => (
                        <div className="flex gap-2 items-center">
                          <FormField
                            key={field.id}
                            control={form.control}
                            name={`excluded.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder="Excludes..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            onClick={() => excludedRemove(index)}
                            type="button"
                            variant="default"
                            size="icon"
                          >
                            <Trash />
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="md:flex gap-3">
                {/* Amenities Fields */}
                <div className="flex-1 mx-auto border p-4 rounded-2xl">
                  <Button
                    type="button"
                    className="my-4"
                    onClick={() => amenitiesAppend({ value: "" })}
                  >
                    Add Amenities
                  </Button>
                  <div className="sm:grid grid-cols-2 gap-5 space-y-2">
                    {amenitiesFields.map(
                      (field: { value: string; id: string }, index: number) => (
                        <div className="flex gap-2 items-center">
                          <FormField
                            key={field.id}
                            control={form.control}
                            name={`amenities.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder="Amenities..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            onClick={() => amenitiesRemove(index)}
                            type="button"
                            variant="default"
                            size="icon"
                          >
                            <Trash />
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Tour Plan Fields */}
                <div className="flex-1 w-full border p-4 rounded-2xl">
                  <Button
                    type="button"
                    className="my-4"
                    onClick={() => tourPlaneAppend({ value: "" })}
                  >
                    Add Tour Plan
                  </Button>
                  <div className="sm:grid grid-cols-2 gap-5 space-y-2">
                    {tourPlaneFields.map(
                      (field: { value: string; id: string }, index: number) => (
                        <div className="flex gap-2 items-center">
                          <FormField
                            key={field.id}
                            control={form.control}
                            name={`tourPlane.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder="Add Tour Plan..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            onClick={() => tourPlaneRemove(index)}
                            type="button"
                            variant="default"
                            size="icon"
                          >
                            <Trash />
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          disabled={!images.length || isLoading}
          form="add-tour"
          type="submit"
          className="w-fit ml-auto"
        >
          {isLoading && <Spinner />}
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
