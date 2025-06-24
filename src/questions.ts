export interface Question {
  question: string;
  category: string;
  answers: string[];
  correct: number; // index in answers array
}

export const hebrewQuestions: Record<string, Question[]> = {
  א: [
    {
      question: "Name something that starts with 'א' (Aleph)",
      category: "General",
      answers: ["אריה (Lion)", "בית (House)", "גמל (Camel)", "דג (Fish)"],
      correct: 0
    },
    {
      question: "Say a city that starts with 'א' (Aleph)",
      category: "Geography",
      answers: ["אילת (Eilat)", "תל אביב (Tel Aviv)", "חיפה (Haifa)"],
      correct: 0
    }
  ],
  ב: [
    {
      question: "Name something that starts with 'ב' (Bet)",
      category: "General",
      answers: ["בננה (Banana)", "אריה (Lion)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ג: [
    {
      question: "Name something that starts with 'ג' (Gimel)",
      category: "General",
      answers: ["גמל (Camel)", "בית (House)", "דג (Fish)"],
      correct: 0
    }
  ],
  ד: [
    {
      question: "Name something that starts with 'ד' (Dalet)",
      category: "General",
      answers: ["דג (Fish)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ה: [
    {
      question: "Name something that starts with 'ה' (He)",
      category: "General",
      answers: ["הר (Mountain)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ו: [
    {
      question: "Name something that starts with 'ו' (Vav)",
      category: "General",
      answers: ["ורד (Rose)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ז: [
    {
      question: "Name something that starts with 'ז' (Zayin)",
      category: "General",
      answers: ["זאב (Wolf)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ח: [
    {
      question: "Name something that starts with 'ח' (Het)",
      category: "General",
      answers: ["חתול (Cat)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ט: [
    {
      question: "Name something that starts with 'ט' (Tet)",
      category: "General",
      answers: ["טווס (Peacock)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  י: [
    {
      question: "Name something that starts with 'י' (Yod)",
      category: "General",
      answers: ["ילד (Child)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  כ: [
    {
      question: "Name something that starts with 'כ' (Kaf)",
      category: "General",
      answers: ["כלב (Dog)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ל: [
    {
      question: "Name something that starts with 'ל' (Lamed)",
      category: "General",
      answers: ["לימון (Lemon)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  מ: [
    {
      question: "Name something that starts with 'מ' (Mem)",
      category: "General",
      answers: ["מלפפון (Cucumber)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  נ: [
    {
      question: "Name something that starts with 'נ' (Nun)",
      category: "General",
      answers: ["נמר (Tiger)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ס: [
    {
      question: "Name something that starts with 'ס' (Samekh)",
      category: "General",
      answers: ["סוס (Horse)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ע: [
    {
      question: "Name something that starts with 'ע' (Ayin)",
      category: "General",
      answers: ["עכבר (Mouse)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  פ: [
    {
      question: "Name something that starts with 'פ' (Pe)",
      category: "General",
      answers: ["פרח (Flower)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  צ: [
    {
      question: "Name something that starts with 'צ' (Tsadi)",
      category: "General",
      answers: ["צב (Turtle)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ק: [
    {
      question: "Name something that starts with 'ק' (Qof)",
      category: "General",
      answers: ["קוף (Monkey)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ר: [
    {
      question: "Name something that starts with 'ר' (Resh)",
      category: "General",
      answers: ["רימון (Pomegranate)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ש: [
    {
      question: "Name something that starts with 'ש' (Shin)",
      category: "General",
      answers: ["שועל (Fox)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ת: [
    {
      question: "Name something that starts with 'ת' (Tav)",
      category: "General",
      answers: ["תפוח (Apple)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ]
}; 