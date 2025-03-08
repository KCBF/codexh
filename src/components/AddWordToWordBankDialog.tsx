import React, { ReactNode, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { MultiSelect } from './ui/MultiSelect';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores/store';
import { addManyWordsToManyBanks } from '@/stores/slice/wordBankSlice';
import { Word } from '@/lib/types';
import { wordBanksAdded } from '@/lib/helpers';

const AddWordToWordBankDialog = ({
  trigger,
  word,
}: {
  trigger: ReactNode;
  word: Word | null;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const wordBanks = useSelector(
    (state: RootState) => state.wordBanks.wordBanks
  );

  const [selectedWordBankIds, setSelectedWordBankIds] = useState<string[]>();
  const dispatch = useDispatch();
  const wordBankAddedList = wordBanksAdded(word, wordBanks);
  useEffect(() => {
    if (wordBankAddedList.length > 0) {
      const IdArrays = wordBankAddedList.map((wb) => wb.id);
      setSelectedWordBankIds(IdArrays);
    }
  }, [open]);

  const wordBanksTransformed = wordBanks.map((wb) => ({
    value: wb.id,
    label: wb.title,
  }));
  const handleAdddWordToWordBank = () => {
    try {
      toast.success('🎉🎉🎉 Word added to word bank');
      dispatch(
        addManyWordsToManyBanks({
          wordBankIdList: selectedWordBankIds || [],
          words: word ? [word] : null,
        })
      );
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('🎉🎉🎉 Cannot add word to word bank');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add this word to your word bank</DialogTitle>
        </DialogHeader>

        <MultiSelect
          options={wordBanksTransformed}
          onValueChange={setSelectedWordBankIds}
          defaultValue={selectedWordBankIds}
          placeholder="Select word bank to add "
          variant="inverted"
          animation={2}
          maxCount={3}
        />

        <DialogFooter>
          <DialogClose>
            <Button>Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => {
              handleAdddWordToWordBank();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddWordToWordBankDialog;
