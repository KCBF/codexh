export interface WordEntry {
  id: number;
  word: string;
  type: string;
  pronunciation: {
    uk: string;
    us: string;
  };
  definitions: {
    meaning: string;
    example: string;
  }[];
  level: 'beginner' | 'intermediate' | 'advanced';
  collocations: {
    phrase: string;
    meaning: string;
  }[];
  synonyms: string[];
  wordFamily: {
    word: string;
    type: string;
  }[];
}

export const wordsList: WordEntry[] = [
  {
    id: 1,
    word: "happy",
    type: "adjective",
    pronunciation: {
      uk: "/ˈhæpi/",
      us: "/ˈhæpi/"
    },
    definitions: [
      {
        meaning: "feeling or showing pleasure or contentment",
        example: "She was happy to see her friends again."
      },
      {
        meaning: "willing to do something",
        example: "I'm happy to help you with your homework."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "perfectly happy",
        meaning: "completely content with something"
      },
      {
        phrase: "happy ending",
        meaning: "a positive conclusion to a story"
      }
    ],
    synonyms: ["glad", "joyful", "cheerful", "delighted", "pleased"],
    wordFamily: [
      {
        word: "happiness",
        type: "noun"
      },
      {
        word: "happily",
        type: "adverb"
      },
      {
        word: "unhappy",
        type: "adjective"
      }
    ]
  },
  {
    id: 2,
    word: "book",
    type: "noun",
    pronunciation: {
      uk: "/bʊk/",
      us: "/bʊk/"
    },
    definitions: [
      {
        meaning: "a written or printed work consisting of pages bound together",
        example: "She read a book about dinosaurs."
      },
      {
        meaning: "a main division of a literary work",
        example: "The novel is divided into three books."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "read a book",
        meaning: "to look at and comprehend the meaning of written content"
      },
      {
        phrase: "write a book",
        meaning: "to create a written work"
      }
    ],
    synonyms: ["publication", "volume", "tome", "text"],
    wordFamily: [
      {
        word: "bookish",
        type: "adjective"
      },
      {
        word: "booking",
        type: "noun"
      },
      {
        word: "booklet",
        type: "noun"
      }
    ]
  },
  {
    id: 3,
    word: "time",
    type: "noun",
    pronunciation: {
      uk: "/taɪm/",
      us: "/taɪm/"
    },
    definitions: [
      {
        meaning: "the indefinite continued progress of existence and events in the past, present, and future",
        example: "Time passes quickly when you're having fun."
      },
      {
        meaning: "a point of time as measured in hours and minutes",
        example: "What time is it?"
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "waste time",
        meaning: "to use time ineffectively"
      },
      {
        phrase: "save time",
        meaning: "to use time efficiently"
      }
    ],
    synonyms: ["period", "duration", "era", "age", "epoch"],
    wordFamily: [
      {
        word: "timely",
        type: "adjective"
      },
      {
        word: "timing",
        type: "noun"
      },
      {
        word: "timeless",
        type: "adjective"
      }
    ]
  },
  {
    id: 4,
    word: "water",
    type: "noun",
    pronunciation: {
      uk: "/ˈwɔːtə(r)/",
      us: "/ˈwɔːtər/"
    },
    definitions: [
      {
        meaning: "a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain",
        example: "Would you like a glass of water?"
      },
      {
        meaning: "a stretch or area of water, such as a river, sea, or lake",
        example: "They sailed across international waters."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "drinking water",
        meaning: "water that is safe to drink"
      },
      {
        phrase: "water supply",
        meaning: "the system that provides water to homes and businesses"
      }
    ],
    synonyms: ["H2O", "liquid", "fluid", "aqua"],
    wordFamily: [
      {
        word: "watery",
        type: "adjective"
      },
      {
        word: "waterless",
        type: "adjective"
      },
      {
        word: "waterproof",
        type: "adjective"
      }
    ]
  },
  {
    id: 5,
    word: "friend",
    type: "noun",
    pronunciation: {
      uk: "/frend/",
      us: "/frend/"
    },
    definitions: [
      {
        meaning: "a person with whom one has a bond of mutual affection",
        example: "She's my best friend."
      },
      {
        meaning: "a person who is not an enemy or opponent; an ally",
        example: "The country has always been a friend to democracy."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "close friend",
        meaning: "someone you have a strong relationship with"
      },
      {
        phrase: "make friends",
        meaning: "to begin a friendship with someone"
      }
    ],
    synonyms: ["companion", "buddy", "pal", "mate", "comrade"],
    wordFamily: [
      {
        word: "friendly",
        type: "adjective"
      },
      {
        word: "friendship",
        type: "noun"
      },
      {
        word: "unfriendly",
        type: "adjective"
      }
    ]
  },
  {
    id: 6,
    word: "learn",
    type: "verb",
    pronunciation: {
      uk: "/lɜːn/",
      us: "/lɜːrn/"
    },
    definitions: [
      {
        meaning: "to gain or acquire knowledge of or skill in by study, experience, or being taught",
        example: "I'm learning to play the piano."
      },
      {
        meaning: "to become aware of by information or from observation",
        example: "I learned that the store was closed."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "learn by heart",
        meaning: "to memorize something completely"
      },
      {
        phrase: "learn from mistakes",
        meaning: "to gain knowledge from errors"
      }
    ],
    synonyms: ["study", "acquire knowledge", "be taught", "master"],
    wordFamily: [
      {
        word: "learner",
        type: "noun"
      },
      {
        word: "learning",
        type: "noun"
      },
      {
        word: "learned",
        type: "adjective"
      }
    ]
  },
  {
    id: 7,
    word: "house",
    type: "noun",
    pronunciation: {
      uk: "/haʊs/",
      us: "/haʊs/"
    },
    definitions: [
      {
        meaning: "a building for human habitation, especially one that consists of a ground floor and one or more upper storeys",
        example: "They live in a house in the suburbs."
      },
      {
        meaning: "a building in which people meet for a particular activity",
        example: "an opera house"
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "house party",
        meaning: "a social gathering at someone's home"
      },
      {
        phrase: "house prices",
        meaning: "the cost of buying residential property"
      }
    ],
    synonyms: ["home", "residence", "dwelling", "abode"],
    wordFamily: [
      {
        word: "housing",
        type: "noun"
      },
      {
        word: "household",
        type: "noun"
      },
      {
        word: "housework",
        type: "noun"
      }
    ]
  },
  {
    id: 8,
    word: "food",
    type: "noun",
    pronunciation: {
      uk: "/fuːd/",
      us: "/fuːd/"
    },
    definitions: [
      {
        meaning: "any nutritious substance that people or animals eat or drink to maintain life and growth",
        example: "The restaurant serves good food."
      },
      {
        meaning: "a particular kind of food",
        example: "Indian food is my favorite."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "food chain",
        meaning: "the hierarchical series of organisms each dependent on the next as a source of food"
      },
      {
        phrase: "food processor",
        meaning: "a kitchen appliance used to facilitate repetitive tasks in the preparation of food"
      }
    ],
    synonyms: ["nourishment", "sustenance", "nutriment", "fare"],
    wordFamily: [
      {
        word: "foodie",
        type: "noun"
      },
      {
        word: "foodstuff",
        type: "noun"
      }
    ]
  },
  {
    id: 9,
    word: "work",
    type: "noun",
    pronunciation: {
      uk: "/wɜːk/",
      us: "/wɜːrk/"
    },
    definitions: [
      {
        meaning: "activity involving mental or physical effort done in order to achieve a purpose or result",
        example: "He has a lot of work to do."
      },
      {
        meaning: "a task or tasks to be undertaken",
        example: "There's still some work to be done on the house."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "hard work",
        meaning: "a great deal of effort or endurance"
      },
      {
        phrase: "work experience",
        meaning: "time spent in a workplace learning about a job"
      }
    ],
    synonyms: ["labor", "toil", "exertion", "effort", "employment"],
    wordFamily: [
      {
        word: "worker",
        type: "noun"
      },
      {
        word: "working",
        type: "adjective"
      },
      {
        word: "workable",
        type: "adjective"
      }
    ]
  },
  {
    id: 10,
    word: "play",
    type: "verb",
    pronunciation: {
      uk: "/pleɪ/",
      us: "/pleɪ/"
    },
    definitions: [
      {
        meaning: "to engage in activity for enjoyment and recreation rather than a serious or practical purpose",
        example: "The children were playing in the garden."
      },
      {
        meaning: "to take part in (a sport)",
        example: "He plays soccer every weekend."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "play a role",
        meaning: "to have an influence or function in something"
      },
      {
        phrase: "play music",
        meaning: "to produce sounds from a musical instrument"
      }
    ],
    synonyms: ["amuse oneself", "entertain oneself", "have fun", "frolic"],
    wordFamily: [
      {
        word: "player",
        type: "noun"
      },
      {
        word: "playful",
        type: "adjective"
      },
      {
        word: "playground",
        type: "noun"
      }
    ]
  },
  {
    id: 11,
    word: "school",
    type: "noun",
    pronunciation: {
      uk: "/skuːl/",
      us: "/skuːl/"
    },
    definitions: [
      {
        meaning: "an institution for educating children",
        example: "My daughter starts school next week."
      },
      {
        meaning: "any institution at which instruction is given in a particular discipline",
        example: "a cooking school"
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "school year",
        meaning: "the period of the year during which students attend school"
      },
      {
        phrase: "school uniform",
        meaning: "standardized clothes worn by students of a particular school"
      }
    ],
    synonyms: ["educational institution", "academy", "college"],
    wordFamily: [
      {
        word: "schooling",
        type: "noun"
      },
      {
        word: "schoolchild",
        type: "noun"
      },
      {
        word: "preschool",
        type: "noun"
      }
    ]
  },
  {
    id: 12,
    word: "family",
    type: "noun",
    pronunciation: {
      uk: "/ˈfæməli/",
      us: "/ˈfæməli/"
    },
    definitions: [
      {
        meaning: "a group consisting of parents and children living together in a household",
        example: "She comes from a large family."
      },
      {
        meaning: "a group of people related by blood or marriage",
        example: "The whole family gathered for the reunion."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "family tree",
        meaning: "a diagram showing the relationships between family members"
      },
      {
        phrase: "family values",
        meaning: "traditional or cultural values concerning family structure and life"
      }
    ],
    synonyms: ["relatives", "relations", "kin", "kinsfolk", "clan"],
    wordFamily: [
      {
        word: "familial",
        type: "adjective"
      },
      {
        word: "familiar",
        type: "adjective"
      },
      {
        word: "familiarity",
        type: "noun"
      }
    ]
  },
  {
    id: 13,
    word: "travel",
    type: "verb",
    pronunciation: {
      uk: "/ˈtrævəl/",
      us: "/ˈtrævəl/"
    },
    definitions: [
      {
        meaning: "to make a journey, typically of some length or abroad",
        example: "She travels to Japan frequently for work."
      },
      {
        meaning: "to move or go from one place to another",
        example: "The news traveled fast."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "travel light",
        meaning: "to travel with minimal luggage"
      },
      {
        phrase: "travel expenses",
        meaning: "costs incurred while traveling"
      }
    ],
    synonyms: ["journey", "voyage", "trip", "expedition", "tour"],
    wordFamily: [
      {
        word: "traveler",
        type: "noun"
      },
      {
        word: "traveling",
        type: "adjective"
      }
    ]
  },
  {
    id: 14,
    word: "help",
    type: "verb",
    pronunciation: {
      uk: "/help/",
      us: "/help/"
    },
    definitions: [
      {
        meaning: "to make it easier or possible for someone to do something by offering them one's services or resources",
        example: "She helped her friend with the homework."
      },
      {
        meaning: "to improve a situation or problem",
        example: "The medicine helped my headache."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "help yourself",
        meaning: "to serve oneself with food or drink"
      },
      {
        phrase: "can't help",
        meaning: "to be unable to prevent oneself from doing something"
      }
    ],
    synonyms: ["assist", "aid", "support", "lend a hand", "facilitate"],
    wordFamily: [
      {
        word: "helper",
        type: "noun"
      },
      {
        word: "helpful",
        type: "adjective"
      },
      {
        word: "helpless",
        type: "adjective"
      }
    ]
  },
  {
    id: 15,
    word: "money",
    type: "noun",
    pronunciation: {
      uk: "/ˈmʌni/",
      us: "/ˈmʌni/"
    },
    definitions: [
      {
        meaning: "a current medium of exchange in the form of coins and banknotes",
        example: "I don't have any money on me."
      },
      {
        meaning: "wealth in terms of property, possessions, and resources",
        example: "He made his money in real estate."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "save money",
        meaning: "to keep money for future use rather than spending it"
      },
      {
        phrase: "spend money",
        meaning: "to pay out money in exchange for goods or services"
      }
    ],
    synonyms: ["cash", "currency", "funds", "capital", "finances"],
    wordFamily: [
      {
        word: "monetary",
        type: "adjective"
      },
      {
        word: "moneyless",
        type: "adjective"
      }
    ]
  },
  {
    id: 16,
    word: "read",
    type: "verb",
    pronunciation: {
      uk: "/riːd/",
      us: "/riːd/"
    },
    definitions: [
      {
        meaning: "to look at and comprehend the meaning of (written or printed matter) by mentally interpreting the characters or symbols of which it is composed",
        example: "She read a book about dinosaurs."
      },
      {
        meaning: "to discover (information) by reading it",
        example: "I read about the accident in the newspaper."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "read aloud",
        meaning: "to read something while speaking the words so others can hear"
      },
      {
        phrase: "read between the lines",
        meaning: "to understand what is implied but not explicitly stated"
      }
    ],
    synonyms: ["peruse", "scan", "study", "review", "examine"],
    wordFamily: [
      {
        word: "reader",
        type: "noun"
      },
      {
        word: "readable",
        type: "adjective"
      },
      {
        word: "reading",
        type: "noun"
      }
    ]
  },
  {
    id: 17,
    word: "write",
    type: "verb",
    pronunciation: {
      uk: "/raɪt/",
      us: "/raɪt/"
    },
    definitions: [
      {
        meaning: "to mark (letters, words, or other symbols) on a surface, typically paper, with a pen, pencil, or similar implement",
        example: "He wrote his name on the form."
      },
      {
        meaning: "to compose, author, or create written works",
        example: "She writes poetry in her spare time."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "write down",
        meaning: "to make a written record of something"
      },
      {
        phrase: "write a letter",
        meaning: "to compose a written message to someone"
      }
    ],
    synonyms: ["pen", "inscribe", "scribble", "compose", "draft"],
    wordFamily: [
      {
        word: "writer",
        type: "noun"
      },
      {
        word: "writing",
        type: "noun"
      },
      {
        word: "written",
        type: "adjective"
      }
    ]
  },
  {
    id: 18,
    word: "speak",
    type: "verb",
    pronunciation: {
      uk: "/spiːk/",
      us: "/spiːk/"
    },
    definitions: [
      {
        meaning: "to say words in order to convey information, an opinion, or feelings",
        example: "He spoke about his experiences in Africa."
      },
      {
        meaning: "to know and be able to use a language",
        example: "She speaks three languages fluently."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "speak up",
        meaning: "to talk more loudly"
      },
      {
        phrase: "speak out",
        meaning: "to express one's opinion publicly"
      }
    ],
    synonyms: ["talk", "converse", "chat", "communicate", "articulate"],
    wordFamily: [
      {
        word: "speaker",
        type: "noun"
      },
      {
        word: "speech",
        type: "noun"
      },
      {
        word: "spoken",
        type: "adjective"
      }
    ]
  },
  {
    id: 19,
    word: "listen",
    type: "verb",
    pronunciation: {
      uk: "/ˈlɪsən/",
      us: "/ˈlɪsən/"
    },
    definitions: [
      {
        meaning: "to give one's attention to a sound",
        example: "I like to listen to music while I work."
      },
      {
        meaning: "to take notice of and act on what someone says",
        example: "You should listen to your doctor's advice."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "listen carefully",
        meaning: "to pay close attention to what is being said"
      },
      {
        phrase: "listen in",
        meaning: "to secretly hear a conversation"
      }
    ],
    synonyms: ["hear", "pay attention", "heed", "attend", "concentrate on"],
    wordFamily: [
      {
        word: "listener",
        type: "noun"
      },
      {
        word: "listening",
        type: "noun"
      }
    ]
  },
  {
    id: 20,
    word: "understand",
    type: "verb",
    pronunciation: {
      uk: "/ˌʌndəˈstænd/",
      us: "/ˌʌndərˈstænd/"
    },
    definitions: [
      {
        meaning: "to perceive the intended meaning of (words, a language, or a speaker)",
        example: "He understands Spanish but doesn't speak it well."
      },
      {
        meaning: "to perceive the significance, explanation, or cause of something",
        example: "I understand the problem now."
      }
    ],
    level: "beginner",
    collocations: [
      {
        phrase: "fully understand",
        meaning: "to comprehend completely"
      },
      {
        phrase: "hard to understand",
        meaning: "difficult to comprehend"
      }
    ],
    synonyms: ["comprehend", "grasp", "fathom", "follow", "make sense of"],
    wordFamily: [
      {
        word: "understanding",
        type: "noun"
      },
      {
        word: "understandable",
        type: "adjective"
      },
      {
        word: "misunderstand",
        type: "verb"
      }
    ]
  }
]; 