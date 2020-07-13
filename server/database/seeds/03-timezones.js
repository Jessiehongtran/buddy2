
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('timezones').del()
    .then(function () {
      // Inserts seed entries
      return knex('timezones').insert([
        {
          id: 1,
          value: "Etc/GMT+12",
          dif: -12,
          name: "(GMT-12:00) International Date Line West"
      },
      {
          id: 2,
          value: "Pacific/Midway",
          dif: -11,
          name: "(GMT-11:00) Midway Island, Samoa"
      },
      {
          id: 3,
          value: "Pacific/Honolulu",
          dif: -10,
          name: "(GMT-10:00) Hawaii"
      },
      {
          id: 4,
          value: "US/Alaska",
          dif: -9,
          name: "(GMT-09:00) Alaska"
      },
      {
          id: 5,
          value: "America/Los_Angeles",
          dif: -8,
          name: "(GMT-08:00) Pacific Time (US & Canada)"
      },
      {
          id: 6,
          value: "America/Tijuana",
          dif: -8,
          name: "(GMT-08:00) Tijuana, Baja California"
      },
      {
          id: 7,
          value: "US/Arizona",
          dif: -7,
          name: "(GMT-07:00) Arizona"
      },
      {
          id: 8,
          value: "America/Chihuahua",
          dif: -7,
          name: "(GMT-07:00) Chihuahua, La Paz, Mazatlan"
      },
      {
          id: 9,
          value: "US/Mountain",
          dif: -7,
          name: "(GMT-07:00) Mountain Time (US & Canada)"
      },
      {
          id: 10,
          value: "America/Managua",
          dif: -6,
          name: "(GMT-06:00) Central America"
      },
      {
          id: 11,
          value: "US/Central",
          dif: -6,
          name: "(GMT-06:00) Central Time (US & Canada)"
      },
      {
          id: 12,
          value: "America/Mexico_City",
          dif: -6,
          name: "(GMT-06:00) Guadalajara, Mexico City, Monterrey"
      },
      {
          id: 13,
          value: "Canada/Saskatchewan",
          dif: -6,
          name: "(GMT-06:00) Saskatchewan"
      },
      {
          id: 14,
          value: "America/Bogota",
          dif: -5,
          name: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
      },
      {
          id: 15,
          value: "US/Eastern",
          dif: -5,
          name: "(GMT-05:00) Eastern Time (US & Canada)"
      },
      {
          id: 16,
          value: "US/East-Indiana",
          dif: -5,
          name: "(GMT-05:00) Indiana (East)"
      },
      {
          id: 17,
          value: "Canada/Atlantic",
          dif: -4,
          name: "(GMT-04:00) Atlantic Time (Canada)"
      },
      {
          id: 18,
          value: "America/Caracas",
          dif: -4,
          name: "(GMT-04:00) Caracas, La Paz"
      },
      {
          id: 19,
          value: "America/Manaus",
          dif: -4,
          name: "(GMT-04:00) Manaus"
      },
      {
          id: 20,
          value: "America/Santiago",
          dif: -4,
          name: "(GMT-04:00) Santiago"
      },
      {
          id: 21,
          value: "Canada/Newfoundland",
          dif: -3,
          name: "(GMT-03:30) Newfoundland"
      },
      {
          id: 22,
          value: "America/Sao_Paulo",
          dif: -3,
          name: "(GMT-03:00) Brasilia"
      },
      {
          id: 23,
          value: "America/Argentina/Buenos_Aires",
          dif: -3,
          name: "(GMT-03:00) Buenos Aires, Georgetown"
      },
      {
          id: 24,
          value: "America/Godthab",
          dif: -3,
          name: "(GMT-03:00) Greenland"
      },
      {
          id: 25,
          value: "America/Montevideo",
          dif: -3,
          name: "(GMT-03:00) Montevideo"
      },
      {
          id: 26,
          value: "America/Noronha",
          dif: -2,
          name: "(GMT-02:00) Mid-Atlantic"
      },
      {
          id: 27,
          value: "Atlantic/Cape_Verde",
          dif: -1,
          name: "(GMT-01:00) Cape Verde Is."
      },
      {
          id: 28,
          value: "Atlantic/Azores",
          dif: -1,
          name: "(GMT-01:00) Azores"
      },
      {
          id: 29,
          value: "Africa/Casablanca",
          dif: 0,
          name: "(GMT+00:00) Casablanca, Monrovia, Reykjavik"
      },
      {
          id: 30,
          value: "Etc/Greenwich",
          dif: 0,
          name: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"
      },
      {
          id: 31,
          value: "Europe/Amsterdam",
          dif: 1,
          name: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
      },
      {
          id: 32,
          value: "Europe/Belgrade",
          dif: 1,
          name: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
      },
      {
          id: 33,
          value: "Europe/Brussels",
          dif: 1,
          name: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"
      },
      {
          id: 34,
          value: "Europe/Sarajevo",
          dif: 1,
          name: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb"
      },
      {
          id: 35,
          value: "Africa/Lagos",
          dif: 1,
          name: "(GMT+01:00) West Central Africa"
      },
      {
          id: 36,
          value: "Asia/Amman",
          dif: 2,
          name: "(GMT+02:00) Amman"
      },
      {
          id: 37,
          value: "Europe/Athens",
          dif: 2,
          name: "(GMT+02:00) Athens, Bucharest, Istanbul"
      },
      {
          id: 38,
          value: "Asia/Beirut",
          dif: 2,
          name: "(GMT+02:00) Beirut"
      },
      {
          id: 39,
          value: "Africa/Cairo",
          dif: 2,
          name: "(GMT+02:00) Cairo"
      },
      {
          id: 40,
          value: "Africa/Harare",
          dif: 2,
          name: "(GMT+02:00) Harare, Pretoria"
      },
      {
          id: 41,
          value: "Europe/Helsinki",
          dif: 2,
          name: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
      },
      {
          id: 42,
          value: "Asia/Jerusalem",
          dif: 2,
          name: "(GMT+02:00) Jerusalem"
      },
      {
          id: 43,
          value: "Europe/Minsk",
          dif: 2,
          name: "(GMT+02:00) Minsk"
      },
      {
          id: 44,
          value: "Africa/Windhoek",
          dif: 2,
          name: "(GMT+02:00) Windhoek"
      },
      {
          id: 45,
          value: "Asia/Kuwait",
          dif: 3,
          name: "(GMT+03:00) Kuwait, Riyadh, Baghdad"
      },
      {
          id: 46,
          value: "Europe/Moscow",
          dif: 3,
          name: "(GMT+03:00) Moscow, St. Petersburg, Volgograd"
      },
      {
          id: 47,
          value: "Africa/Nairobi",
          dif: 3,
          name: "(GMT+03:00) Nairobi"
      },
      {
          id: 48,
          value: "Asia/Tbilisi",
          dif: 3,
          name: "(GMT+03:00) Tbilisi"
      },
      {
          id: 49,
          value: "Asia/Tehran",
          dif: 3.5,
          name: "(GMT+03:30) Tehran"
      },
      {
          id: 50,
          value: "Asia/Muscat",
          dif: 4,
          name: "(GMT+04:00) Abu Dhabi, Muscat"
      },
      {
          id: 51,
          value: "Asia/Baku",
          dif: 4,
          name: "(GMT+04:00) Baku"
      },
      {
          id: 52,
          value: "Asia/Yerevan",
          dif: 4,
          name: "(GMT+04:00) Yerevan"
      },
      {
          id: 53,
          value: "Asia/Kabul",
          dif: 4.5,
          name: "(GMT+04:30) Kabul"
      },
      {
          id: 54,
          value: "Asia/Yekaterinburg",
          dif: 5,
          name: "(GMT+05:00) Yekaterinburg"
      },
      {
          id: 55,
          value: "Asia/Karachi",
          dif: 5,
          name: "(GMT+05:00) Islamabad, Karachi, Tashkent"
      },
      {
          id: 56,
          value: "Asia/Calcutta",
          dif: 5.5,
          name: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi"
      },
      {
          id: 57,
          value: "Asia/Calcutta",
          dif: 5.5,
          name: "(GMT+05:30) Sri Jayawardenapura"
      },
      {
          id: 58,
          value: "Asia/Katmandu",
          dif: 5.75,
          name: "(GMT+05:45) Kathmandu"
      },
      {
          id: 59,
          value: "Asia/Almaty",
          dif: 6,
          name: "(GMT+06:00) Almaty, Novosibirsk"
      },
      {
          id: 60,
          value: "Asia/Dhaka",
          dif: 6,
          name: "(GMT+06:00) Astana, Dhaka"
      },
      {
          id: 61,
          value: "Asia/Rangoon",
          dif: 6.5,
          name: "(GMT+06:30) Yangon (Rangoon)"
      },
      {
          id: 62,
          value: "Asia/Bangkok",
          dif: 7,
          name: "(GMT+07:00) Bangkok, Hanoi, Jakarta"
      },
      {
          id: 63,
          value: "Asia/Krasnoyarsk",
          dif: 7,
          name: "(GMT+07:00) Krasnoyarsk"
      },
      {
          id: 64,
          value: "Asia/Hong_Kong",
          dif: 8,
          name: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
      },
      {
          id: 65,
          value: "Asia/Kuala_Lumpur",
          dif: 8,
          name: "(GMT+08:00) Kuala Lumpur, Singapore"
      },
      {
          id: 66,
          value: "Asia/Irkutsk",
          dif: 8,
          name: "(GMT+08:00) Irkutsk, Ulaan Bataar"
      },
      {
          id: 67,
          value: "Australia/Perth",
          dif: 8,
          name: "(GMT+08:00) Perth"
      },
      {
          id: 68,
          value: "Asia/Taipei",
          dif: 8,
          name: "(GMT+08:00) Taipei"
      },
      {
          id: 69,
          value: "Asia/Tokyo",
          dif: 9,
          name: "(GMT+09:00) Osaka, Sapporo, Tokyo"
      },
      {
          id: 70,
          value: "Asia/Seoul",
          dif: 9,
          name: "(GMT+09:00) Seoul"
      },
      {
          id: 71,
          value: "Asia/Yakutsk",
          dif: 9,
          name: "(GMT+09:00) Yakutsk"
      },
      {
          id: 72,
          value: "Australia/Adelaide",
          dif: 9.5,
          name: "(GMT+09:30) Adelaide"
      },
      {
          id: 73,
          value: "Australia/Darwin",
          dif: 9.5,
          name: "(GMT+09:30) Darwin"
      },
      {
          id: 74,
          value: "Australia/Brisbane",
          dif: 10,
          name: "(GMT+10:00) Brisbane"
      },
      {
          id: 75,
          value: "Australia/Canberra",
          dif: 10,
          name: "(GMT+10:00) Canberra, Melbourne, Sydney"
      },
      {
          id: 76,
          value: "Australia/Hobart",
          dif: 10,
          name: "(GMT+10:00) Hobart"
      },
      {
          id: 77,
          value: "Australia/Hobart",
          dif: 10,
          name: "(GMT+10:00) Hobart"
      },
      {
          id: 78,
          value: "Pacific/Guam",
          dif: 10,
          name: "(GMT+10:00) Guam, Port Moresby"
      },
      {
          id: 79,
          value: "Asia/Vladivostok",
          dif: 10,
          name: "(GMT+10:00) Vladivostok"
      },
      {
          id: 80,
          value: "Asia/Magadan",
          dif: 11,
          name: "(GMT+11:00) Magadan, Solomon Is., New Caledonia"
      },
      {
          id: 81,
          value: "Pacific/Auckland",
          dif: 12,
          name: "(GMT+12:00) Auckland, Wellington"
      },
      {
          id: 82,
          value: "Pacific/Fiji",
          dif: 12,
          name: "(GMT+12:00) Fiji, Kamchatka, Marshall Is."
      },
      {
          id: 83,
          value: "Pacific/Tongatapu",
          dif: 13,
          name: "(GMT+13:00) Nuku'alofa"
      }
      ]);
    });
};
