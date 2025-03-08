import { Word } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export const words: Word[] = [
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/uki/ukiri/ukiridi011.mp3',
    type: 'adjective',
    word: 'ironic',
    ipa: {
      uk: '/aɪˈrɒn.ɪk/',
      us: '/aɪˈrɑː.nɪk/',
    },
    meaning: 'unexpected thus funny',
    examples: {
      english: (
        <p className="italic">
          It’s <span className="font-bold underline">ironic</span> that Sarah,
          the librarian, got fined for overdue books.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Thật <span className="font-bold underline">trớ trêu</span> khi Sarah,
          thủ thư, lại bị phạt vì mượn sách quá hạn.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',

    type: 'adjective',
    word: 'hello',
    ipa: {
      uk: '/həˈləʊ/',
      us: '/həˈloʊ/',
    },
    meaning: 'a greeting or expression of goodwill',
    examples: {
      english: (
        <p className="italic">
          It’s <span className="font-bold underline">hello</span> that Sarah
          says when she sees anyone.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Sarah chào mọi người bằng{' '}
          <span className="font-bold underline">xin chào</span>.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukr/ukrum/ukrum__018.mp3',

    type: 'verb',
    word: 'run',
    ipa: {
      uk: '/rʌn/',
      us: '/rʌn/',
    },
    meaning: 'to move swiftly on foot',
    examples: {
      english: (
        <p className="italic">
          Sarah <span className="font-bold underline">ran</span> to the bus
          stop.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Sarah <span className="font-bold underline">chạy</span> đến trạm xe
          buýt.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukb/ukbon/ukbonfi028.mp3',
    type: 'noun',
    word: 'book',
    ipa: {
      uk: '/bʊk/',
      us: '/bʊk/',
    },
    meaning: 'a set of written or printed pages, typically bound with a cover',
    examples: {
      english: (
        <p className="italic">
          She is reading a <span className="font-bold underline">book</span> on
          history.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Cô ấy đang đọc một{' '}
          <span className="font-bold underline">cuốn sách</span> về lịch sử.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/us_pron/e/eat/eat__/eat.mp3',

    type: 'verb',
    word: 'eat',
    ipa: {
      uk: '/iːt/',
      us: '/iːt/',
    },
    meaning: 'to consume food',
    examples: {
      english: (
        <p className="italic">
          Sarah <span className="font-bold underline">ate</span> a sandwich for
          lunch.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Sarah <span className="font-bold underline">ăn</span> một chiếc bánh
          mì cho bữa trưa.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukc/ukcap/ukcapit027.mp3',

    type: 'noun',
    word: 'car',
    ipa: {
      uk: '/kɑːr/',
      us: '/kɑːr/',
    },
    meaning:
      'a road vehicle, typically with four wheels, powered by an internal combustion engine or electric motor',
    examples: {
      english: (
        <p className="italic">
          They bought a new <span className="font-bold underline">car</span>{' '}
          last week.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Họ đã mua một chiếc <span className="font-bold underline">ô tô</span>{' '}
          mới tuần trước.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukd/ukdoc/ukdocud022.mp3',

    type: 'noun',
    word: 'dog',
    ipa: {
      uk: '/dɒɡ/',
      us: '/dɔːɡ/',
    },
    meaning: 'a domesticated carnivorous mammal',
    examples: {
      english: (
        <p className="italic">
          The <span className="font-bold underline">dog</span> barked loudly.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Con <span className="font-bold underline">chó</span> sủa to.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhap/ukhapha010.mp3',

    type: 'adjective',
    word: 'happy',
    ipa: {
      uk: '/ˈhæpi/',
      us: '/ˈhæpi/',
    },
    meaning: 'feeling or showing pleasure or contentment',
    examples: {
      english: (
        <p className="italic">
          Sarah was <span className="font-bold underline">happy</span> after the
          test.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Sarah cảm thấy <span className="font-bold underline">vui vẻ</span> sau
          bài kiểm tra.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukt/uktre/uktreac020.mp3',

    type: 'noun',
    word: 'tree',
    ipa: {
      uk: '/triː/',
      us: '/triː/',
    },
    meaning: 'a woody perennial plant',
    examples: {
      english: (
        <p className="italic">
          The <span className="font-bold underline">tree</span> grew tall over
          the years.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Cái <span className="font-bold underline">cây</span> cao lên theo năm
          tháng.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/uk_pron/u/ukj/ukjud/ukjudic027.mp3',

    type: 'verb',
    word: 'jump',
    ipa: {
      uk: '/dʒʌmp/',
      us: '/dʒʌmp/',
    },
    meaning: 'to spring off the ground',
    examples: {
      english: (
        <p className="italic">
          Sarah <span className="font-bold underline">jumped</span> over the
          fence.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Sarah <span className="font-bold underline">nhảy</span> qua hàng rào.
        </p>
      ),
    },
  },
  {
    id: uuidv4(),
    audio:
      'https://dictionary.cambridge.org/media/english/us_pron_ogg/p/pho/phone/phone.ogg',

    type: 'noun',
    word: 'phone',
    ipa: {
      uk: '/fəʊn/',
      us: '/foʊn/',
    },
    meaning: 'a system for talking to someone who is far away',
    examples: {
      english: (
        <p className="italic">
          Sarah received a call on her{' '}
          <span className="font-bold underline">phone</span>.
        </p>
      ),
      vietnamese: (
        <p className="italic">
          Sarah nhận được một cuộc gọi trên{' '}
          <span className="font-bold underline">điện thoại</span> của cô ấy.
        </p>
      ),
    },
  },
];
