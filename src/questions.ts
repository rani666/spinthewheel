export interface Question {
  question: string;
  answers: string[];
  correct: number; // index in answers array
}

export const hebrewQuestions: Record<string, Question[]> = {
  א: [
    {
      question: "Name something that starts with 'א' (Aleph)",
      answers: ["אריה (Lion)", "בית (House)", "גמל (Camel)", "דג (Fish)"],
      correct: 0
    },
    {
      question: "Say a city that starts with 'א' (Aleph)",
      answers: ["אילת (Eilat)", "תל אביב (Tel Aviv)", "חיפה (Haifa)"],
      correct: 0
    }
  ],
  ב: [
    {
      question: "Name something that starts with 'ב' (Bet)",
      answers: ["בננה (Banana)", "אריה (Lion)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ג: [
    {
      question: "Name something that starts with 'ג' (Gimel)",
      answers: ["גמל (Camel)", "בית (House)", "דג (Fish)"],
      correct: 0
    }
  ],
  ד: [
    {
      question: "Name something that starts with 'ד' (Dalet)",
      answers: ["דג (Fish)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ה: [
    {
      question: "Name something that starts with 'ה' (He)",
      answers: ["הר (Mountain)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ו: [
    {
      question: "Name something that starts with 'ו' (Vav)",
      answers: ["ורד (Rose)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ז: [
    {
      question: "Name something that starts with 'ז' (Zayin)",
      answers: ["זאב (Wolf)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ח: [
    {
      question: "Name something that starts with 'ח' (Het)",
      answers: ["חתול (Cat)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ט: [
    {
      question: "Name something that starts with 'ט' (Tet)",
      answers: ["טווס (Peacock)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  י: [
    {
      question: "Name something that starts with 'י' (Yod)",
      answers: ["ילד (Child)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  כ: [
    {
      question: "Name something that starts with 'כ' (Kaf)",
      answers: ["כלב (Dog)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ל: [
    {
      question: "Name something that starts with 'ל' (Lamed)",
      answers: ["לימון (Lemon)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  מ: [
    {
      question: "Name something that starts with 'מ' (Mem)",
      answers: ["מלפפון (Cucumber)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  נ: [
    {
      question: "Name something that starts with 'נ' (Nun)",
      answers: ["נמר (Tiger)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ס: [
    {
      question: "Name something that starts with 'ס' (Samekh)",
      answers: ["סוס (Horse)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ע: [
    {
      question: "Name something that starts with 'ע' (Ayin)",
      answers: ["עכבר (Mouse)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  פ: [
    {
      question: "Name something that starts with 'פ' (Pe)",
      answers: ["פרח (Flower)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  צ: [
    {
      question: "Name something that starts with 'צ' (Tsadi)",
      answers: ["צב (Turtle)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ק: [
    {
      question: "Name something that starts with 'ק' (Qof)",
      answers: ["קוף (Monkey)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ר: [
    {
      question: "Name something that starts with 'ר' (Resh)",
      answers: ["רימון (Pomegranate)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ש: [
    {
      question: "Name something that starts with 'ש' (Shin)",
      answers: ["שועל (Fox)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ],
  ת: [
    {
      question: "Name something that starts with 'ת' (Tav)",
      answers: ["תפוח (Apple)", "בית (House)", "גמל (Camel)"],
      correct: 0
    }
  ]
}; 