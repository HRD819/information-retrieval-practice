// 題目沿用原始教材；維護時保留每題總分 100。
export const quests = [
  {
    "title": "尋找失落的食譜",
    "description": "你的室友最近迷上了川菜，指定要吃經典的「麻婆豆腐」。但他不僅是個素食主義者，對料理的要求還特別高，堅持要尋找最正宗、最道地的四川麻辣口味食譜。為了避免他吃到不喜歡的料理而鬧脾氣，你必須在網路上幫他過濾掉所有包含「豬絞肉」或「牛肉」的作法，同時也要確保找到的食譜是專為「素食」者設計的，最好能找到一些有詳細步驟說明的文章或部落格。",
    "keywords": [
      "麻婆豆腐",
      "食譜",
      "四川",
      "素食",
      "豬絞肉",
      "牛肉"
    ],
    "solutionChecks": [
      {
        "type": "phrase",
        "value": "麻婆豆腐",
        "score": 25,
        "hint": "把「麻婆豆腐」用引號包起來，才能找到完整的片語喔！"
      },
      {
        "type": "include",
        "value": "四川",
        "score": 25,
        "hint": "題目要求「四川」作法，你是不是忘了這個關鍵字？"
      },
      {
        "type": "exclude_or",
        "values": [
          "豬絞肉",
          "牛肉"
        ],
        "score": 25,
        "hint": "不想看到「豬絞肉」或「牛肉」？可以用 `-豬絞肉 -牛肉` 來排除它們！"
      },
      {
        "type": "include",
        "value": "素食",
        "score": 25,
        "hint": "記得要包含「素食」作法這個重點！"
      }
    ]
  },
  {
    "title": "學術界的巨人",
    "description": "系上教授正在指導一篇關於「人工智慧倫理」的畢業論文，需要你協助搜集高品質的學術參考資料。為了確保資料的權威性，教授特別指定來源必須是台灣的頂尖大學網站，例如國立台灣大學(NTU)或國立清華大學(NTHU)的學術單位。此外，為了方便閱讀與整理，他希望找到的資料是已經排版好的簡報檔案，也就是PDF格式。你的任務是在這些指定的學術殿堂中，挖出相關的PDF簡報。",
    "keywords": [
      "人工智慧倫理",
      "台大",
      "清大",
      "簡報",
      "pdf",
      "ntu.edu.tw",
      "nthu.edu.tw",
      "畢業論文"
    ],
    "solutionChecks": [
      {
        "type": "phrase",
        "value": "人工智慧倫理",
        "score": 30,
        "hint": "「人工智慧倫理」是個專有名詞，用引號框起來效果更好。"
      },
      {
        "type": "filetype",
        "value": "pdf",
        "score": 30,
        "hint": "想要PDF檔？別忘了 `filetype:pdf` 這個咒語！"
      },
      {
        "type": "site_or",
        "values": [
          "site:ntu.edu.tw",
          "site:nthu.edu.tw"
        ],
        "score": 40,
        "hint": "要同時找台大(ntu.edu.tw)和清大(nthu.edu.tw)的網站，可以用 `(site:ntu.edu.tw OR site:nthu.edu.tw)` 這樣的組合技。"
      }
    ]
  },
  {
    "title": "追蹤市場動態",
    "description": "你是一名緊盯產業前線的財經記者，最近科技界的頭條大事，莫過於晶圓代工龍頭「台積電」(TSMC)宣布計畫到「美國亞利桑那州設廠」。你的總編輯要求你立刻寫一篇深度分析報導，但他有一個嚴格的要求：只參考那些直接將「台積電」和「美國設廠」這兩件事作為核心新聞標題的報導。他認為，只有標題就點出重點的文章，才具有最高的參考價值。你的挑戰是，從茫茫新聞海中，精準撈出這些標題完全命中紅心的文章。",
    "keywords": [
      "台積電",
      "美國設廠",
      "新聞",
      "標題",
      "報導",
      "intitle",
      "allintitle",
      "TSMC"
    ],
    "solutionChecks": [
      {
        "type": "intitle_all",
        "values": [
          "台積電",
          "美國設廠"
        ],
        "score": 100,
        "hint": "要讓關鍵字都出現在標題裡，可以使用 `allintitle:台積電 美國設廠` 或 `intitle:台積電 intitle:美國設廠`。"
      }
    ]
  },
  {
    "title": "歷史的足跡",
    "description": "你正在為一門「科技與人文」的通識課撰寫期末報告，主題設定在探討「數位典藏」(Digital Archives)技術，如何被全球的「博物館」(Museums)廣泛應用。為了讓報告的論點更為集中，你希望找到的文獻資料中，「數位典藏」和「博物館」這兩個核心概念是緊密相連、在文章中被一同深入探討的，最好是出現在同一個句子或段落裡，而不是剛好被分散在文章的不同角落。你需要在學術資料庫或網站中，找到這兩個詞彙彼此鄰近的資料。",
    "keywords": [
      "數位典藏",
      "博物館",
      "應用",
      "資料",
      "技術",
      "AROUND",
      "Digital Archives",
      "Museum",
      "Museums"
    ],
    "solutionChecks": [
      {
        "type": "proximity",
        "values": [
          "數位典藏",
          "博物館"
        ],
        "distance": 8,
        "score": 100,
        "hint": "想讓兩個詞很靠近？試試 `\"數位典藏\" AROUND(8) \"博物館\"` 吧！數字可以自己調整。"
      }
    ]
  },
  {
    "title": "高階魔法：跨語系詠唱",
    "description": "為了準備圖書資訊學系的期末報告，你需要搜集國內外關於「資訊素養」的最新學術文獻。你的研究範圍主要鎖定在「大學」或高等教育階段的應用與教學，因此任何關於「國小」或「中學」的資料都必須被排除，以免干擾你的研究方向。為了確保能直接閱讀和引用，你希望找到的都是PDF格式的檔案。最重要的是，你深知「資訊素養」的英文是 \"information literacy\"，為了讓研究更具國際視野，你必須同時檢索這兩種語言的詞彙。",
    "keywords": [
      "資訊素養",
      "information literacy",
      "大學",
      "學術文獻",
      "pdf",
      "國小",
      "中學",
      "高等教育"
    ],
    "solutionChecks": [
      {
        "type": "synonym_or",
        "values": [
          "資訊素養",
          "information literacy"
        ],
        "score": 40,
        "hint": "高手都知道要用括號 `()` 搭配 `OR` 來同時查找「資訊素養」和它的英文同義詞 \"information literacy\"！"
      },
      {
        "type": "include",
        "value": "大學",
        "score": 20,
        "hint": "題目要求和「大學」有關，是不是忘了這個關鍵字？"
      },
      {
        "type": "exclude_or",
        "values": [
          "國小",
          "中學"
        ],
        "score": 20,
        "hint": "要排除「國小」和「中學」的資料，記得使用 `-國小 -中學` 喔。"
      },
      {
        "type": "filetype",
        "value": "pdf",
        "score": 20,
        "hint": "為了更精準找到學術文獻，限定檔案類型是個好方法，例如 `filetype:pdf`。"
      }
    ]
  },
  {
    "title": "社群風向觀測",
    "description": "你是一家市場分析公司的實習生，第一個任務是分析最新的智慧型手機「Pixel 9」在社群媒體上的討論熱度。主管要求你特別關注「X (舊稱Twitter)」上的使用者真實回饋，想了解大家對於「電池續航力」的看法。然而，為了避免報告充滿了廠商的廣告文案或新聞稿，你必須排除掉任何來自官方新聞網站或科技媒體的報導，只看來自社群平台的原生討論。",
    "keywords": [
      "Pixel 9",
      "電池",
      "續航力",
      "X",
      "Twitter",
      "社群",
      "site:x.com"
    ],
    "solutionChecks": [
      {
        "type": "phrase",
        "value": "Pixel 9",
        "score": 30,
        "hint": "產品名稱通常是固定詞組，用引號 `\"Pixel 9\"` 可以更精準。"
      },
      {
        "type": "include",
        "value": "電池",
        "score": 20,
        "hint": "別忘了主題是關於「電池」的討論。"
      },
      {
        "type": "site_any",
        "values": [
          "site:x.com",
          "site:twitter.com"
        ],
        "score": 30,
        "hint": "要限定在X/Twitter上搜尋，`site:x.com` 是你的最佳武器。"
      },
      {
        "type": "exclude",
        "value": "新聞",
        "score": 20,
        "hint": "為了排除官方報導，可以試著用 `-新聞` 或 `-報導` 來過濾。",
        "alternatives": [
          "報導"
        ]
      }
    ]
  },
  {
    "title": "尋找法律依據",
    "description": "你正在協助一位律師處理一件關於「著作權」的案件，需要查找我國（台灣）的相關法律條文。為了確保資料的正確性與權威性，你必須從政府官方網站，也就是網域結尾為「.gov.tw」的網站中尋找資料。你需要找到完整的「著作權法」全文，而且最好是可以直接下載的Word檔案（.doc或.docx），方便律師後續編輯與標註。",
    "keywords": [
      "著作權法",
      "法條",
      "台灣",
      "政府",
      "gov.tw",
      "Word",
      "doc",
      "docx"
    ],
    "solutionChecks": [
      {
        "type": "phrase",
        "value": "著作權法",
        "score": 30,
        "hint": "法律名稱是專有名詞，使用 `\"著作權法\"` 進行片語搜尋是基本功。"
      },
      {
        "type": "site",
        "value": "gov.tw",
        "score": 40,
        "hint": "要尋找政府資料，`site:gov.tw` 是不可或缺的指令。"
      },
      {
        "type": "filetype_or",
        "values": [
          "filetype:doc",
          "filetype:docx"
        ],
        "score": 30,
        "hint": "要找Word檔，可以用 `(filetype:doc OR filetype:docx)` 來一網打盡。"
      }
    ]
  },
  {
    "title": "影評大搜查",
    "description": "最近一部名為「沙丘：第二部」的科幻電影上映了，你和朋友們對它的評價非常好奇。你想找一些深入的影評來看，但你特別想知道知名影評網站「IMDb」和「爛番茄(Rotten Tomatoes)」給出的專業評論。你不希望看到一般新聞報導或是粉絲的短篇心得，只想看這兩個網站上的權威評論文章。",
    "keywords": [
      "沙丘：第二部",
      "影評",
      "IMDb",
      "爛番茄",
      "Rotten Tomatoes",
      "評論"
    ],
    "solutionChecks": [
      {
        "type": "phrase",
        "value": "沙丘：第二部",
        "score": 30,
        "hint": "電影名稱很長，用 `\"沙丘：第二部\"` 包起來才不會搜到不相干的東西。"
      },
      {
        "type": "include",
        "value": "影評",
        "score": 20,
        "hint": "你的目標是找「影評」，記得把這個詞放進去。"
      },
      {
        "type": "site_or",
        "values": [
          "site:imdb.com",
          "site:rottentomatoes.com"
        ],
        "score": 50,
        "hint": "想一次搜尋IMDb和爛番茄？試試 `(site:imdb.com OR site:rottentomatoes.com)` 吧！"
      }
    ]
  },
  {
    "title": "城市漫遊計畫",
    "description": "你計畫在下個週末來一趟「台南」輕旅行，並且對充滿文藝氣息的「獨立書店」特別感興趣。你想找一些部落格文章或是旅遊心得，看看大家推薦哪些店家。不過，因為你不喜歡去連鎖店，所以要特別排除掉台灣最大的連鎖書店「誠品」。你的目標是找到那些真正由在地人經營、充滿特色的書店資訊。",
    "keywords": [
      "台南",
      "獨立書店",
      "旅遊",
      "部落格",
      "心得",
      "誠品",
      "推薦"
    ],
    "solutionChecks": [
      {
        "type": "include",
        "value": "台南",
        "score": 30,
        "hint": "目的地是「台南」，這是最重要的關鍵字之一。"
      },
      {
        "type": "phrase",
        "value": "獨立書店",
        "score": 40,
        "hint": "你想找的是「獨立書店」這個特定類別，用引號框起來吧！"
      },
      {
        "type": "exclude",
        "value": "誠品",
        "score": 30,
        "hint": "不想去誠品？一個簡單的 `-誠品` 就能幫你排除它。"
      }
    ]
  },
  {
    "title": "程式碼疑難雜症",
    "description": "你是一位正在學習Python程式設計的學生，最近在處理資料時遇到了關於「Pandas」這個函庫的難題。你想要學習如何「合併多個DataFrame」，但網路上的教學文章品質參差不齊。你只想看程式開發者最信賴的兩個問答社群「Stack Overflow」或技術部落格平台「Medium」上的教學文章或解決方案，希望能找到一些附有程式碼範例的實用解答。",
    "keywords": [
      "Python",
      "Pandas",
      "DataFrame",
      "合併",
      "merge",
      "concat",
      "Stack Overflow",
      "Medium"
    ],
    "solutionChecks": [
      {
        "type": "include",
        "value": "python",
        "score": 20,
        "hint": "記得標明你用的程式語言是 `Python`。"
      },
      {
        "type": "include",
        "value": "pandas",
        "score": 20,
        "hint": "問題的核心函式庫 `Pandas` 不能忘。"
      },
      {
        "type": "phrase",
        "value": "合併 DataFrame",
        "score": 30,
        "hint": "把你的具體問題 `\"合併 DataFrame\"` 用引號包起來，搜尋結果會更精準。"
      },
      {
        "type": "site_or",
        "values": [
          "site:stackoverflow.com",
          "site:medium.com"
        ],
        "score": 30,
        "hint": "限定在專業社群搜尋，`site:stackoverflow.com OR site:medium.com` 是你的好幫手。"
      }
    ]
  }
];
