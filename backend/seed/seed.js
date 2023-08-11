const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main()
{
    const stationData = [
        {
            name: 'Abanpola',
            latitude: 7.9191593978269585,
            longitude: 80.24610072883551,
            contactNumber: '0253891292',
        },
        {
            name: 'Agbopura',
            latitude: 8.326962653569677,
            longitude: 80.97974659692282,
            contactNumber: '0771879448',
        },
        {
            name: 'Ahangama',
            latitude: 5.973381846866456,
            longitude: 80.36371580669417,
            contactNumber: '0912283271',
        },
        {
            name: 'Ahungalle',
            latitude: 6.3129101606375215,
            longitude: 80.03758907971037,
            contactNumber: null,
        },
        {
            name: 'Akurala',
            latitude: 6.192301917328595,
            longitude: 80.0649127527224,
            contactNumber: null,
        },
        {
            name: 'Alawwa',
            latitude: 7.293554459377983,
            longitude: 80.2385616085557,
            contactNumber: '0372278171',
        },
        {
            name: 'Alawathupitiya',
            latitude: 7.116038463034067,
            longitude: 79.88709429690901,
            contactNumber: null,
        },
        {
            name: 'Aluthgama',
            latitude: 6.43207381963862,
            longitude: 80.00036135272454,
            contactNumber: '0342275282',
        },
        {
            name: 'Ambalangoda',
            latitude: 6.235459770328387,
            longitude: 80.05513779874897,
            contactNumber: '0912258271',
        },

        {
            name: "Colombo Fort",
            latitude: 6.933492299999999,
            longitude: 79.85050639999997,
            contactNumber: ""
        },
        {
            name: "Maradana",
            latitude: 6.929516,
            longitude: 79.865854,
            contactNumber: "0112695722"
        },
        {
            name: "Dematagoda",
            latitude: 6.937512,
            longitude: 79.879213,
            contactNumber: "0112693838"
        },
        {
            name: "Kelaniya",
            latitude: 6.961020,
            longitude: 79.894663,
            contactNumber: "0112911426"
        },
        {
            name: "Wanawasala",
            latitude: 6.975691,
            longitude: 79.899310,
            contactNumber: ""
        },

        {
            name: "Hunupitiya",
            latitude: 6.987990,
            longitude: 79.900612,
            contactNumber: "",
        },
        {
            name: "Enderamulla",
            latitude: 7.000618,
            longitude: 79.906873,
            contactNumber: "",
        },
        {
            name: "Horape",
            latitude: 7.016523,
            longitude: 79.918262,
            contactNumber: "",
        },
        {
            name: "Ragama",
            latitude: 7.029853,
            longitude: 79.921533,
            contactNumber: "0112959271",
        },
        {
            name: "Walpola",
            latitude: 7.047171,
            longitude: 79.931109,
            contactNumber: "",
        },
        {
            name: "Batuwatte",
            latitude: 7.055124,
            longitude: 79.937164,
            contactNumber: "",
        },
        {
            name: "Bulugahagoda",
            latitude: 7.066083,
            longitude: 79.945698,
            contactNumber: "",
        },
        {
            name: "Ganemulla",
            latitude: 7.068667,
            longitude: 79.960710,
            contactNumber: "033-2260271",
        },
        {
            name: "Yagoda",
            latitude: 7.074697,
            longitude: 79.973860,
            contactNumber: "",
        },



        {
            name: "Heendeniya",
            latitude: 7.141153,
            longitude: 80.047125,
            contactNumber: "",
        },
        {
            name: "Veyangoda",
            latitude: 7.152959,
            longitude: 80.058543,
            contactNumber: "033-2287271",
        },
        {
            name: "Wandurawa",
            latitude: 7.167611,
            longitude: 80.066065,
            contactNumber: "",
        },
        {
            name: "Keenawala",
            latitude: 7.185467,
            longitude: 80.074495,
            contactNumber: "",
        },


        {
            name: "Pallewela",
            latitude: 7.198731,
            longitude: 80.090028,
            contactNumber: "033-2273271",
        },
        {
            name: "Ganegoda",
            latitude: 7.212790,
            longitude: 80.105402,
            contactNumber: "",
        },
        {
            name: "Wijayarajadahana",
            latitude: 7.230748,
            longitude: 80.118657,
            contactNumber: "",
        },
        {
            name: "Mirigama",
            latitude: 7.242565,
            longitude: 80.126651,
            contactNumber: "033-2273271",
        },


        {
            name: "Kitalelle",
            latitude: 6.861156,
            longitude: 81.043117,
            contactNumber: "",
        },
        {
            name: "Elle",
            latitude: 6.875745,
            longitude: 81.047106,
            contactNumber: "057-2228571",
        },
        {
            name: "Demodara",
            latitude: 6.903082,
            longitude: 81.062785,
            contactNumber: "055-2294171",
        },
        {
            name: "Uduwara",
            latitude: 6.931544,
            longitude: 81.042117,
            contactNumber: "",
        },
        {
            name: "Haliela",
            latitude: 6.954030,
            longitude: 81.033527,
            contactNumber: "055-2294271",
        },
        {
            name: "Badulla",
            latitude: 6.980100,
            longitude: 81.059679,
            contactNumber: "055-2222271",
        },
        // Add more station data here...
    ];

    for (const data of stationData)
    {
        await prisma.station.create({
            data
        });
    }

    const userData = [
        {
            // id: 'd30ade8e-bc01-497b-a516-9e3b2aa1e474',
            nic: '200064703151',
            email: 'sandalikachamari@gmail.com',
            dob: new Date('2000-05-26T18:00:00.000Z'),
            password: '$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO',
            firstName: 'sandalika',
            lastName: 'chamari',
            loginStatus: false,
            accountStatus: true,
            registeredDate: new Date('2023-08-08T07:31:11.537Z'),
            mobileNumber: '0779232261',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzMGFkZThlLWJjMDEtNDk3Yi1hNTE2LTllM2IyYWExZTQ3NCIsImVtYWlsIjoic2FuZGFsaWthY2hhbWFyaUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6WyJQQVNTRU5HRVIiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1MTY4MjEsImV4cCI6MTY5MjEyMTYyMX0.tCSRNMoAcGufRlHeLgsC8hO1el23cGX6_vSYotD8D6E',
            otp: '',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDMwYWRlOGUtYmMwMS00OTdiLWE1MTYtOWUzYjJhYTFlNDc0IiwibmljIjoiMjAwMDY0NzAzMTUxIiwiZW1haWwiOiJzYW5kYWxpa2FjaGFtYXJpQGdtYWlsLmNvbSIsImRvYiI6IjIwMDAtMDUtMjZUMTg6MDA6MDAuMDAwWiIsInBhc3N3b3JkIjoiJDJiJDEwJEpUZ2RCR0QuNExwU2Exc0N1RG4xbE9HVXhVYms5Y3ExL050cnJ0T3RubVJrandxWkk4V21PIiwiZmlyc3ROYW1lIjoic2FuZGFsaWthICIsImxhc3ROYW1lIjoiY2hhbWFyaSAiLCJsb2dpblN0YXR1cyI6ZmFsc2UsImFjY291bnRTdGF0dXMiOnRydWUsInJlZ2lzdGVyZWREYXRlIjoiMjAyMy0wOC0wOFQwNzozMToxMS41MzdaIiwibW9iaWxlTnVtYmVyIjoiMDc3OTIzMjI2MSIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SW1Rek1HRmtaVGhsTFdKak1ERXRORGszWWkxaE5URTJMVGxsTTJJeVlXRXhaVFEzTkNJc0luVnpaWEpVZVhCbElqcGJJbEJCVTFORlRrZEZVaUpkTENKMGVYQmxJam9pY21WbWNtVnphQ0lzSW1saGRDSTZNVFk1TVRVd01qWTRNU3dpWlhod0lqb3hOamt5TVRBM05EZ3hmUS52UXFmM0pBbUJtS1FlVGV4MWpicVliX2JHWjFmTFpWa0pRdERUckRBWk5ZIiwib3RwIjoiIiwiYWNjZXNzVG9rZW4iOiIiLCJvdHBHZW5lcmF0ZVRpbWUiOm51bGwsInVzZXJUeXBlIjpbIlBBU1NFTkdFUiJdfSwiaWF0IjoxNjkxNTE2ODIxLCJleHAiOjE2OTE1MjQwMjF9.93_hG1cGGcsAZGuKPtDB1iWZg3C2tvyrNEB6UFCzgGg',
            otpGenerateTime: null,
            userType: ['PASSENGER'],
        },
        { 
            // id: 'd30ade8e-bc01-497b-a516-9e3b2aa1e474',
            nic: '996523250V',
            email: 'savanihasadara@gmail.com',
            dob: new Date('2000-05-26T18:00:00.000Z'),
            password: '$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO',
            firstName: 'Savani',
            lastName: 'Hasadara',
            loginStatus: false,
            accountStatus: true,
            registeredDate: new Date('2023-08-08T07:31:11.537Z'),
            mobileNumber: '0761004812',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzMGFkZThlLWJjMDEtNDk3Yi1hNTE2LTllM2IyYWExZTQ3NCIsImVtYWlsIjoic2FuZGFsaWthY2hhbWFyaUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6WyJQQVNTRU5HRVIiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1MTY4MjEsImV4cCI6MTY5MjEyMTYyMX0.tCSRNMoAcGufRlHeLgsC8hO1el23cGX6_vSYotD8D6E',
            otp: '',
            accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDMwYWRlOGUtYmMwMS00OTdiLWE1MTYtOWUzYjJhYTFlNDc0IiwibmljIjoiMjAwMDY0NzAzMTUxIiwiZW1haWwiOiJzYW5kYWxpa2FjaGFtYXJpQGdtYWlsLmNvbSIsImRvYiI6IjIwMDAtMDUtMjZUMTg6MDA6MDAuMDAwWiIsInBhc3N3b3JkIjoiJDJiJDEwJEpUZ2RCR0QuNExwU2Exc0N1RG4xbE9HVXhVYms5Y3ExL050cnJ0T3RubVJrandxWkk4V21PIiwiZmlyc3ROYW1lIjoic2FuZGFsaWthICIsImxhc3ROYW1lIjoiY2hhbWFyaSAiLCJsb2dpblN0YXR1cyI6ZmFsc2UsImFjY291bnRTdGF0dXMiOnRydWUsInJlZ2lzdGVyZWREYXRlIjoiMjAyMy0wOC0wOFQwNzozMToxMS41MzdaIiwibW9iaWxlTnVtYmVyIjoiMDc3OTIzMjI2MSIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBaQ0k2SW1Rek1HRmtaVGhsTFdKak1ERXRORGszWWkxaE5URTJMVGxsTTJJeVlXRXhaVFEzTkNJc0luVnpaWEpVZVhCbElqcGJJbEJCVTFORlRrZEZVaUpkTENKMGVYQmxJam9pY21WbWNtVnphQ0lzSW1saGRDSTZNVFk1TVRVd01qWTRNU3dpWlhod0lqb3hOamt5TVRBM05EZ3hmUS52UXFmM0pBbUJtS1FlVGV4MWpicVliX2JHWjFmTFpWa0pRdERUckRBWk5ZIiwib3RwIjoiIiwiYWNjZXNzVG9rZW4iOiIiLCJvdHBHZW5lcmF0ZVRpbWUiOm51bGwsInVzZXJUeXBlIjpbIlBBU1NFTkdFUiJdfSwiaWF0IjoxNjkxNTE2ODIxLCJleHAiOjE2OTE1MjQwMjF9.93_hG1cGGcsAZGuKPtDB1iWZg3C2tvyrNEB6UFCzgGg',
            otpGenerateTime: null,
            userType: ['STATION_MASTER'],
        },
        { 
            nic: "997000510v",
            email: "paridew99@gmail.com",
            dob: new Date('1999-07-18T00:00:00.000Z'),
            password: "$2b$10$ldyAPFNtKu8gU8/tyqMNJ.Y/f.7fA43TrSQczHayQwJDAp/IsAWI6",
            firstName: "Parindi",
            lastName: "Dewmini",
            loginStatus: false,
            accountStatus: true,
            registeredDate: new Date('2023-08-02T18:01:26.384Z'),
            mobileNumber: "0765848013",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VyVHlwZSI6WyJBRE1JTiJdLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTY5MTU2Mzg2NiwiZXhwIjoxNjkyMTY4NjY2fQ.gEwxAcO8BtGpCjekib1iN_nof5hpoxBmQTQ3K84CB0U",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["ADMIN"],
        },
        {

            nic: "997791550V",
            email: "nadeedarshika1999@gmail.com",
            dob: new Date('2001-02-16T18:00:00.000Z'),
            password: "$2b$10$6PB9/oHx6FcgTRzqqjwGcOQ8wooD3jXh6QgdjUa5u8VojG8c5Z/2m",
            firstName: "Nadee",
            lastName: "Darshika",
            loginStatus: false,
            accountStatus: true,
            registeredDate: new Date('2023-08-04T15:30:31.785Z'),
            mobileNumber: "0763850138",
            token: "",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["CONTROL_CENTRE"],
        }, {

            nic: "996740099V",
            email: "kaveeshagw@gmail.com",
            dob: new Date('1920-01-05T18:30:00.000Z'),
            password: "$2b$10$JTgdBGD.4LpSa1sCuDn1lOGUxUbk9cq1/NtrrtOtnmRkjwqZI8WmO",
            firstName: "kaveesha",
            lastName: "gimhani",
            loginStatus: false,
            accountStatus: false,
            registeredDate: new Date('2023-08-05T04:57:34.569Z'),
            mobileNumber: "01233654789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1OGFhMDFmLWExNzYtNGIxNC04MTA2LTJiYzgzOTI0ZGYzN1xuIiwidXNlclR5cGUiOlsiQ09OVFJPTF9DRU5UUkUiXSwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE2OTE1NTgwMTIsImV4cCI6MTY5MjE2MjgxMn0.tpgMo9kOyYnLECEfiOYswH154d4EvpHeUVgvMg6L4aE",
            otp: "",
            accessToken: "",
            otpGenerateTime: null,
            userType: ["CONTROL_CENTRE"],
        },
    ];

    for (const data of userData)
    {
        await prisma.user.create({
            data,
        });
    }





    const classData = [
        { className: 'THIRD_CLASS_RESERVED', code: 'TCR' },
        { className: 'THIRD_CLASS_NOT_RESERVED', code: 'TC' },
        { className: 'FIRST_CLASS_AC', code: 'FC' },
        { className: 'FIRST_CLASS_RESERVED', code: 'FCR' },
        { className: 'OBSERVATION_CLASS', code: 'OFV' },
        { className: 'SLEEPER_CLASS', code: 'SLEEP' },
        { className: 'SECOND_CLASS_RESERVED', code: 'SCR' },
        { className: 'SECOND_CLASS_NOT_RESERVED', code: 'SC' },
        // Add more class data here...
    ];


    for (const data of classData) {
        await prisma.class.create({
            data,
        });
    }

    const coachData = [
        { coachCode: 'TC5', seatCapacity: 48, seatArrangement: 5, classId: 2, reservable: false },
        { coachCode: 'TC2', seatCapacity: 48, seatArrangement: 2, classId: 2, reservable: false },
        { coachCode: 'TCR5', seatCapacity: 48, seatArrangement: 5, classId: 1, reservable: true },
        { coachCode: 'TCR4', seatCapacity: 48, seatArrangement: 4, classId: 1, reservable: true },
        { coachCode: 'FC4', seatCapacity: 48, seatArrangement: 4, classId: 3, reservable: true },
        { coachCode: 'OFV4', seatCapacity: 48, seatArrangement: 4, classId: 5, reservable: true },
        { coachCode: 'SLEEP4', seatCapacity: 48, seatArrangement: 4, classId: 6, reservable: true },
        { coachCode: 'SCR4', seatCapacity: 48, seatArrangement: 4, classId: 7, reservable: true },
        { coachCode: 'SC4', seatCapacity: 48, seatArrangement: 4, classId: 8, reservable: false },
        // Add more coach data here...
    ];

    for (const data of coachData) {
        await prisma.coach.create({
            data,
        });
    }
}

main()
    .catch((e) =>
    {
        throw e;
    })
    .finally(async () =>
    {
        await prisma.$disconnect();
    });