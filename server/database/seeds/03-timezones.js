
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
          name: "(GMT-08:00) Pacific Standard Time (US & Canada)"
      },
      {
        id: 6,
        value: "America/Los_Angeles",
        dif: -7,
        name: "(GMT-08:00) Pacific Daylight Time (US & Canada)"
      },
      {
          id: 7,
          value: "America/Tijuana",
          dif: -8,
          name: "(GMT-08:00) Tijuana, Baja California"
      },
      {
          id: 8,
          value: "US/Arizona",
          dif: -7,
          name: "(GMT-07:00) Arizona"
      },
      {
          id: 9,
          value: "America/Chihuahua",
          dif: -7,
          name: "(GMT-07:00) Chihuahua, La Paz, Mazatlan"
      },
      {
          id: 10,
          value: "US/Mountain",
          dif: -7,
          name: "(GMT-07:00) Mountain Time (US & Canada)"
      },
      {
          id: 11,
          value: "America/Managua",
          dif: -6,
          name: "(GMT-06:00) Central America"
      },
      {
          id: 12,
          value: "US/Central",
          dif: -6,
          name: "(GMT-06:00) Central Time (US & Canada)"
      },
      {
          id: 13,
          value: "America/Mexico_City",
          dif: -6,
          name: "(GMT-06:00) Guadalajara, Mexico City, Monterrey"
      },
      {
          id: 14,
          value: "Canada/Saskatchewan",
          dif: -6,
          name: "(GMT-06:00) Saskatchewan"
      },
      {
          id: 15,
          value: "America/Bogota",
          dif: -5,
          name: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
      },
      {
          id: 16,
          value: "US/Eastern",
          dif: -5,
          name: "(GMT-05:00) Eastern Time (US & Canada)"
      },
      {
          id: 17,
          value: "US/East-Indiana",
          dif: -5,
          name: "(GMT-05:00) Indiana (East)"
      },
      {
          id: 18,
          value: "Canada/Atlantic",
          dif: -4,
          name: "(GMT-04:00) Atlantic Time (Canada)"
      },
      {
          id: 19,
          value: "America/Caracas",
          dif: -4,
          name: "(GMT-04:00) Caracas, La Paz"
      },
      {
          id: 20,
          value: "America/Manaus",
          dif: -4,
          name: "(GMT-04:00) Manaus"
      },
      {
          id: 21,
          value: "America/Santiago",
          dif: -4,
          name: "(GMT-04:00) Santiago"
      },
      {
          id: 22,
          value: "Canada/Newfoundland",
          dif: -3,
          name: "(GMT-03:30) Newfoundland"
      },
      {
          id: 23,
          value: "America/Sao_Paulo",
          dif: -3,
          name: "(GMT-03:00) Brasilia"
      },
      {
          id: 24,
          value: "America/Argentina/Buenos_Aires",
          dif: -3,
          name: "(GMT-03:00) Buenos Aires, Georgetown"
      },
      {
          id: 25,
          value: "America/Godthab",
          dif: -3,
          name: "(GMT-03:00) Greenland"
      },
      {
          id: 26,
          value: "America/Montevideo",
          dif: -3,
          name: "(GMT-03:00) Montevideo"
      },
      {
          id: 27,
          value: "America/Noronha",
          dif: -2,
          name: "(GMT-02:00) Mid-Atlantic"
      },
      {
          id: 28,
          value: "Atlantic/Cape_Verde",
          dif: -1,
          name: "(GMT-01:00) Cape Verde Is."
      },
      {
          id: 29,
          value: "Atlantic/Azores",
          dif: -1,
          name: "(GMT-01:00) Azores"
      },
      {
          id: 30,
          value: "Africa/Casablanca",
          dif: 0,
          name: "(GMT+00:00) Casablanca, Monrovia, Reykjavik"
      },
      {
          id: 31,
          value: "Etc/Greenwich",
          dif: 0,
          name: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"
      },
      {
          id: 32,
          value: "Europe/Amsterdam",
          dif: 1,
          name: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
      },
      {
          id: 33,
          value: "Europe/Belgrade",
          dif: 1,
          name: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
      },
      {
          id: 34,
          value: "Europe/Brussels",
          dif: 1,
          name: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"
      },
      {
          id: 35,
          value: "Europe/Sarajevo",
          dif: 1,
          name: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb"
      },
      {
          id: 36,
          value: "Africa/Lagos",
          dif: 1,
          name: "(GMT+01:00) West Central Africa"
      },
      {
          id: 37,
          value: "Asia/Amman",
          dif: 2,
          name: "(GMT+02:00) Amman"
      },
      {
          id: 38,
          value: "Europe/Athens",
          dif: 2,
          name: "(GMT+02:00) Athens, Bucharest, Istanbul"
      },
      {
          id: 39,
          value: "Asia/Beirut",
          dif: 2,
          name: "(GMT+02:00) Beirut"
      },
      {
          id: 40,
          value: "Africa/Cairo",
          dif: 2,
          name: "(GMT+02:00) Cairo"
      },
      {
          id: 41,
          value: "Africa/Harare",
          dif: 2,
          name: "(GMT+02:00) Harare, Pretoria"
      },
      {
          id: 42,
          value: "Europe/Helsinki",
          dif: 2,
          name: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
      },
      {
          id: 43,
          value: "Asia/Jerusalem",
          dif: 2,
          name: "(GMT+02:00) Jerusalem"
      },
      {
          id: 44,
          value: "Europe/Minsk",
          dif: 2,
          name: "(GMT+02:00) Minsk"
      },
      {
          id: 45,
          value: "Africa/Windhoek",
          dif: 2,
          name: "(GMT+02:00) Windhoek"
      },
      {
          id: 46,
          value: "Asia/Kuwait",
          dif: 3,
          name: "(GMT+03:00) Kuwait, Riyadh, Baghdad"
      },
      {
          id: 47,
          value: "Europe/Moscow",
          dif: 3,
          name: "(GMT+03:00) Moscow, St. Petersburg, Volgograd"
      },
      {
          id: 48,
          value: "Africa/Nairobi",
          dif: 3,
          name: "(GMT+03:00) Nairobi"
      },
      {
          id: 49,
          value: "Asia/Tbilisi",
          dif: 3,
          name: "(GMT+03:00) Tbilisi"
      },
      {
          id: 50,
          value: "Asia/Tehran",
          dif: 3.5,
          name: "(GMT+03:30) Tehran"
      },
      {
          id: 51,
          value: "Asia/Muscat",
          dif: 4,
          name: "(GMT+04:00) Abu Dhabi, Muscat"
      },
      {
          id: 52,
          value: "Asia/Baku",
          dif: 4,
          name: "(GMT+04:00) Baku"
      },
      {
          id: 53,
          value: "Asia/Yerevan",
          dif: 4,
          name: "(GMT+04:00) Yerevan"
      },
      {
          id: 54,
          value: "Asia/Kabul",
          dif: 4.5,
          name: "(GMT+04:30) Kabul"
      },
      {
          id: 55,
          value: "Asia/Yekaterinburg",
          dif: 5,
          name: "(GMT+05:00) Yekaterinburg"
      },
      {
          id: 56,
          value: "Asia/Karachi",
          dif: 5,
          name: "(GMT+05:00) Islamabad, Karachi, Tashkent"
      },
      {
          id: 57,
          value: "Asia/Calcutta",
          dif: 5.5,
          name: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi"
      },
      {
          id: 58,
          value: "Asia/Calcutta",
          dif: 5.5,
          name: "(GMT+05:30) Sri Jayawardenapura"
      },
      {
          id: 59,
          value: "Asia/Katmandu",
          dif: 5.75,
          name: "(GMT+05:45) Kathmandu"
      },
      {
          id: 60,
          value: "Asia/Almaty",
          dif: 6,
          name: "(GMT+06:00) Almaty, Novosibirsk"
      },
      {
          id: 61,
          value: "Asia/Dhaka",
          dif: 6,
          name: "(GMT+06:00) Astana, Dhaka"
      },
      {
          id: 62,
          value: "Asia/Rangoon",
          dif: 6.5,
          name: "(GMT+06:30) Yangon (Rangoon)"
      },
      {
          id: 63,
          value: "Asia/Bangkok",
          dif: 7,
          name: "(GMT+07:00) Bangkok, Hanoi, Jakarta"
      },
      {
          id: 64,
          value: "Asia/Krasnoyarsk",
          dif: 7,
          name: "(GMT+07:00) Krasnoyarsk"
      },
      {
          id: 65,
          value: "Asia/Hong_Kong",
          dif: 8,
          name: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi"
      },
      {
          id: 66,
          value: "Asia/Kuala_Lumpur",
          dif: 8,
          name: "(GMT+08:00) Kuala Lumpur, Singapore"
      },
      {
          id: 67,
          value: "Asia/Irkutsk",
          dif: 8,
          name: "(GMT+08:00) Irkutsk, Ulaan Bataar"
      },
      {
          id: 68,
          value: "Australia/Perth",
          dif: 8,
          name: "(GMT+08:00) Perth"
      },
      {
          id: 69,
          value: "Asia/Taipei",
          dif: 8,
          name: "(GMT+08:00) Taipei"
      },
      {
          id: 70,
          value: "Asia/Tokyo",
          dif: 9,
          name: "(GMT+09:00) Osaka, Sapporo, Tokyo"
      },
      {
          id: 71,
          value: "Asia/Seoul",
          dif: 9,
          name: "(GMT+09:00) Seoul"
      },
      {
          id: 72,
          value: "Asia/Yakutsk",
          dif: 9,
          name: "(GMT+09:00) Yakutsk"
      },
      {
          id: 73,
          value: "Australia/Adelaide",
          dif: 9.5,
          name: "(GMT+09:30) Adelaide"
      },
      {
          id: 74,
          value: "Australia/Darwin",
          dif: 9.5,
          name: "(GMT+09:30) Darwin"
      },
      {
          id: 75,
          value: "Australia/Brisbane",
          dif: 10,
          name: "(GMT+10:00) Brisbane"
      },
      {
          id: 76,
          value: "Australia/Canberra",
          dif: 10,
          name: "(GMT+10:00) Canberra, Melbourne, Sydney"
      },
      {
          id: 77,
          value: "Australia/Hobart",
          dif: 10,
          name: "(GMT+10:00) Hobart"
      },
      {
          id: 78,
          value: "Australia/Hobart",
          dif: 10,
          name: "(GMT+10:00) Hobart"
      },
      {
          id: 79,
          value: "Pacific/Guam",
          dif: 10,
          name: "(GMT+10:00) Guam, Port Moresby"
      },
      {
          id: 80,
          value: "Asia/Vladivostok",
          dif: 10,
          name: "(GMT+10:00) Vladivostok"
      },
      {
          id: 81,
          value: "Asia/Magadan",
          dif: 11,
          name: "(GMT+11:00) Magadan, Solomon Is., New Caledonia"
      },
      {
          id: 82,
          value: "Pacific/Auckland",
          dif: 12,
          name: "(GMT+12:00) Auckland, Wellington"
      },
      {
          id: 83,
          value: "Pacific/Fiji",
          dif: 12,
          name: "(GMT+12:00) Fiji, Kamchatka, Marshall Is."
      },
      {
          id: 84,
          value: "Pacific/Tongatapu",
          dif: 13,
          name: "(GMT+13:00) Nuku'alofa"
      }
      ]);
    });
};
