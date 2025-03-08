import React, { ReactNode, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
} from './ui/dialog';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from './ui/form';
import { Input } from './ui/input';
import { useDispatch } from 'react-redux';
import { createNewWordBank } from '@/stores/slice/wordBankSlice';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters long' })
    .max(200, { message: 'Title must be no longer than 200 characters' }),
  imageUrl: z
    .string()
    .url({ message: 'Please provide a valid URL for the image' }),
});

const CreateNewWordBankDialog = ({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const createNewWordBank_ = (values: z.infer<typeof formSchema>) => {
    dispatch(
      createNewWordBank({
        title: values.title,
        words: [],
        imageUrl: values.imageUrl,
      })
    );
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
    },
  });
  // Handle dialog close event and reset form
  const handleDialogClose = () => {
    form.reset();
    setOpen(false); // Close the dialog
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      createNewWordBank_(values);
      toast.success('🎉 Create new word bank successfully');
      form.reset();
      handleDialogClose();
    } catch (error) {
      console.log(error);
      toast.error('😓 Cannot create word bank');
    }
  }

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleDialogClose(); // Reset form when dialog closes
        }
        setOpen(isOpen);
      }}
    >
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your new word bank</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Please fill in new word bank&apos;s title
                  </FormDescription>
                </FormItem>
              )}
            />{' '}
            <FormField
              name="imageUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image url</FormLabel>
                  <FormControl>
                    <Input placeholder="image..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Please fill in new word bank&apos;s image url
                  </FormDescription>
                </FormItem>
              )}
            />{' '}
          </form>
        </Form>
        <DialogFooter>
          <DialogClose>
            <Button variant={'outline'}>Close</Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewWordBankDialog;
