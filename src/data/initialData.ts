import type { Category, Transaction } from "../types";

export const initialTransactions: Transaction[] = [
    {
      "id": "1",
      "date": "2025-01-03",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5200
    },
    {
      "id": "2",
      "date": "2025-01-05",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1400
    },
    {
      "id": "3",
      "date": "2025-01-07",
      "description": "Grocery Store",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 85.50
    },
    {
      "id": "4",
      "date": "2025-01-10",
      "description": "Electric Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 120
    },
    {
      "id": "5",
      "date": "2025-01-12",
      "description": "Uber Rides",
      "category": "Transportation",
      "type": "expense",
      "amount": 45
    },
    {
      "id": "6",
      "date": "2025-01-15",
      "description": "Freelance Web Project",
      "category": "Freelance",
      "type": "income",
      "amount": 800
    },
    {
      "id": "7",
      "date": "2025-01-18",
      "description": "Sony Headphones",
      "category": "Shopping",
      "type": "expense",
      "amount": 199.99
    },
    {
      "id": "8",
      "date": "2025-01-20",
      "description": "Netflix and Spotify",
      "category": "Entertainment",
      "type": "expense",
      "amount": 25.98
    },
    {
      "id": "9",
      "date": "2025-01-22",
      "description": "Restaurant Dinner",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 62
    },
    {
      "id": "10",
      "date": "2025-01-25",
      "description": "Gas Station",
      "category": "Transportation",
      "type": "expense",
      "amount": 55
    },
    {
      "id": "11",
      "date": "2025-01-28",
      "description": "Pharmacy Medicine",
      "category": "Healthcare",
      "type": "expense",
      "amount": 35
    },
    {
      "id": "12",
      "date": "2025-01-30",
      "description": "Coursera Subscription",
      "category": "Education",
      "type": "expense",
      "amount": 49.99
    },
    {
      "id": "13",
      "date": "2025-02-01",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5200
    },
    {
      "id": "14",
      "date": "2025-02-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1400
    },
    {
      "id": "15",
      "date": "2025-02-05",
      "description": "Weekly Groceries",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 92.30
    },
    {
      "id": "16",
      "date": "2025-02-08",
      "description": "Internet Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 79.99
    },
    {
      "id": "17",
      "date": "2025-02-10",
      "description": "Stock Dividend",
      "category": "Investment",
      "type": "income",
      "amount": 350
    },
    {
      "id": "18",
      "date": "2025-02-12",
      "description": "Movie Night",
      "category": "Entertainment",
      "type": "expense",
      "amount": 32
    },
    {
      "id": "19",
      "date": "2025-02-15",
      "description": "Winter Jacket",
      "category": "Shopping",
      "type": "expense",
      "amount": 149
    },
    {
      "id": "20",
      "date": "2025-02-18",
      "description": "Monthly Bus Pass",
      "category": "Transportation",
      "type": "expense",
      "amount": 65
    },
    {
      "id": "21",
      "date": "2025-02-20",
      "description": "Freelance UI Design",
      "category": "Freelance",
      "type": "income",
      "amount": 1200
    },
    {
      "id": "22",
      "date": "2025-02-22",
      "description": "Dentist Cleaning",
      "category": "Healthcare",
      "type": "expense",
      "amount": 180
    },
    {
      "id": "23",
      "date": "2025-02-25",
      "description": "Starbucks Weekly",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 48.50
    },
    {
      "id": "24",
      "date": "2025-02-28",
      "description": "Phone Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 55
    },
    {
      "id": "25",
      "date": "2025-03-01",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5200
    },
    {
      "id": "26",
      "date": "2025-03-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1400
    },
    {
      "id": "27",
      "date": "2025-03-05",
      "description": "Costco Groceries",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 110.75
    },
    {
      "id": "28",
      "date": "2025-03-08",
      "description": "Electricity Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 135
    },
    {
      "id": "29",
      "date": "2025-03-10",
      "description": "Freelance Logo Design",
      "category": "Freelance",
      "type": "income",
      "amount": 950
    },
    {
      "id": "30",
      "date": "2025-03-12",
      "description": "Gym Membership",
      "category": "Healthcare",
      "type": "expense",
      "amount": 45
    },
    {
      "id": "31",
      "date": "2025-03-14",
      "description": "Concert Tickets",
      "category": "Entertainment",
      "type": "expense",
      "amount": 85
    },
    {
      "id": "32",
      "date": "2025-03-16",
      "description": "Amazon Electronics",
      "category": "Shopping",
      "type": "expense",
      "amount": 67.49
    },
    {
      "id": "33",
      "date": "2025-03-18",
      "description": "Uber Eats Delivery",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 38.90
    },
    {
      "id": "34",
      "date": "2025-03-20",
      "description": "Car Oil Change",
      "category": "Transportation",
      "type": "expense",
      "amount": 250
    },
    {
      "id": "35",
      "date": "2025-03-22",
      "description": "Quarterly Dividend",
      "category": "Investment",
      "type": "income",
      "amount": 200
    },
    {
      "id": "36",
      "date": "2025-03-25",
      "description": "Programming Book",
      "category": "Education",
      "type": "expense",
      "amount": 29.99
    },
    {
      "id": "37",
      "date": "2025-03-28",
      "description": "Water Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 42
    },
    {
      "id": "38",
      "date": "2025-03-30",
      "description": "Birthday Gift for Friend",
      "category": "Shopping",
      "type": "expense",
      "amount": 75
    },
    {
      "id": "39",
      "date": "2025-04-01",
      "description": "Monthly Salary (Raised)",
      "category": "Salary",
      "type": "income",
      "amount": 5500
    },
    {
      "id": "40",
      "date": "2025-04-02",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1400
    },
    {
      "id": "41",
      "date": "2025-04-05",
      "description": "Trader Joes Groceries",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 97.25
    },
    {
      "id": "42",
      "date": "2025-04-07",
      "description": "Gas and Electric",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 145
    },
    {
      "id": "43",
      "date": "2025-04-09",
      "description": "Running Shoes",
      "category": "Shopping",
      "type": "expense",
      "amount": 120
    },
    {
      "id": "44",
      "date": "2025-04-11",
      "description": "Freelance Consulting",
      "category": "Freelance",
      "type": "income",
      "amount": 1500
    },
    {
      "id": "45",
      "date": "2025-04-13",
      "description": "Disney Plus and YouTube",
      "category": "Entertainment",
      "type": "expense",
      "amount": 35.97
    },
    {
      "id": "46",
      "date": "2025-04-15",
      "description": "Taxi to Airport",
      "category": "Transportation",
      "type": "expense",
      "amount": 28
    },
    {
      "id": "47",
      "date": "2025-04-17",
      "description": "Whole Foods Shopping",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 78.60
    },
    {
      "id": "48",
      "date": "2025-04-19",
      "description": "Annual Health Checkup",
      "category": "Healthcare",
      "type": "expense",
      "amount": 150
    },
    {
      "id": "49",
      "date": "2025-04-21",
      "description": "Udemy React Course",
      "category": "Education",
      "type": "expense",
      "amount": 14.99
    },
    {
      "id": "50",
      "date": "2025-04-23",
      "description": "Mutual Fund Returns",
      "category": "Investment",
      "type": "income",
      "amount": 500
    },
    {
      "id": "51",
      "date": "2025-04-25",
      "description": "Team Lunch",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 42
    },
    {
      "id": "52",
      "date": "2025-04-28",
      "description": "Internet Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 79.99
    },
    {
      "id": "53",
      "date": "2025-05-01",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5500
    },
    {
      "id": "54",
      "date": "2025-05-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1400
    },
    {
      "id": "55",
      "date": "2025-05-06",
      "description": "Grocery Shopping",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 105.50
    },
    {
      "id": "56",
      "date": "2025-05-10",
      "description": "Freelance App Development",
      "category": "Freelance",
      "type": "income",
      "amount": 1800
    },
    {
      "id": "57",
      "date": "2025-05-14",
      "description": "Electricity Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 110
    },
    {
      "id": "58",
      "date": "2025-05-18",
      "description": "New Backpack",
      "category": "Shopping",
      "type": "expense",
      "amount": 79.99
    },
    {
      "id": "59",
      "date": "2025-05-22",
      "description": "Gym Membership",
      "category": "Healthcare",
      "type": "expense",
      "amount": 45
    },
    {
      "id": "60",
      "date": "2025-05-25",
      "description": "Streaming Services",
      "category": "Entertainment",
      "type": "expense",
      "amount": 29.99
    },
    {
      "id": "61",
      "date": "2025-05-28",
      "description": "Gas Station",
      "category": "Transportation",
      "type": "expense",
      "amount": 52
    },
    {
      "id": "62",
      "date": "2025-06-01",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5500
    },
    {
      "id": "63",
      "date": "2025-06-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1400
    },
    {
      "id": "64",
      "date": "2025-06-07",
      "description": "Restaurant Dinner",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 88.00
    },
    {
      "id": "65",
      "date": "2025-06-10",
      "description": "Stock Dividend",
      "category": "Investment",
      "type": "income",
      "amount": 420
    },
    {
      "id": "66",
      "date": "2025-06-15",
      "description": "Internet Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 79.99
    },
    {
      "id": "67",
      "date": "2025-06-18",
      "description": "Summer Clothes",
      "category": "Shopping",
      "type": "expense",
      "amount": 165
    },
    {
      "id": "68",
      "date": "2025-06-22",
      "description": "Beach Trip",
      "category": "Entertainment",
      "type": "expense",
      "amount": 120
    },
    {
      "id": "69",
      "date": "2025-06-25",
      "description": "Uber Rides",
      "category": "Transportation",
      "type": "expense",
      "amount": 38
    },
    {
      "id": "70",
      "date": "2025-06-28",
      "description": "Eye Checkup",
      "category": "Healthcare",
      "type": "expense",
      "amount": 95
    },
    {
      "id": "71",
      "date": "2025-07-01",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5500
    },
    {
      "id": "72",
      "date": "2025-07-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1400
    },
    {
      "id": "73",
      "date": "2025-07-08",
      "description": "Freelance Consulting",
      "category": "Freelance",
      "type": "income",
      "amount": 1100
    },
    {
      "id": "74",
      "date": "2025-07-12",
      "description": "Weekly Groceries",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 95.75
    },
    {
      "id": "75",
      "date": "2025-07-16",
      "description": "Movie Tickets",
      "category": "Entertainment",
      "type": "expense",
      "amount": 42
    },
    {
      "id": "76",
      "date": "2025-07-20",
      "description": "Car Service",
      "category": "Transportation",
      "type": "expense",
      "amount": 180
    },
    {
      "id": "77",
      "date": "2025-07-23",
      "description": "Doctor Visit",
      "category": "Healthcare",
      "type": "expense",
      "amount": 120
    },
    {
      "id": "78",
      "date": "2025-07-26",
      "description": "Phone Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 55
    },
    {
      "id": "79",
      "date": "2025-07-29",
      "description": "Online Course",
      "category": "Education",
      "type": "expense",
      "amount": 34.99
    },
    {
      "id": "80",
      "date": "2025-08-01",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5500
    },
    {
      "id": "81",
      "date": "2025-08-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1400
    },
    {
      "id": "82",
      "date": "2025-08-07",
      "description": "Costco Trip",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 142.30
    },
    {
      "id": "83",
      "date": "2025-08-12",
      "description": "Freelance Website Build",
      "category": "Freelance",
      "type": "income",
      "amount": 2200
    },
    {
      "id": "84",
      "date": "2025-08-15",
      "description": "Gas and Electric",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 155
    },
    {
      "id": "85",
      "date": "2025-08-18",
      "description": "Gaming Console",
      "category": "Shopping",
      "type": "expense",
      "amount": 299.99
    },
    {
      "id": "86",
      "date": "2025-08-22",
      "description": "Spotify Premium",
      "category": "Entertainment",
      "type": "expense",
      "amount": 12.99
    },
    {
      "id": "87",
      "date": "2025-08-25",
      "description": "Taxi Fare",
      "category": "Transportation",
      "type": "expense",
      "amount": 35
    },
    {
      "id": "88",
      "date": "2025-08-28",
      "description": "Pharmacy",
      "category": "Healthcare",
      "type": "expense",
      "amount": 28
    },
    {
      "id": "89",
      "date": "2025-09-01",
      "description": "Monthly Salary (Raised)",
      "category": "Salary",
      "type": "income",
      "amount": 5800
    },
    {
      "id": "90",
      "date": "2025-09-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1400
    },
    {
      "id": "91",
      "date": "2025-09-08",
      "description": "Grocery Store",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 98.50
    },
    {
      "id": "92",
      "date": "2025-09-12",
      "description": "Investment Return",
      "category": "Investment",
      "type": "income",
      "amount": 650
    },
    {
      "id": "93",
      "date": "2025-09-14",
      "description": "Concert Night",
      "category": "Entertainment",
      "type": "expense",
      "amount": 120
    },
    {
      "id": "94",
      "date": "2025-09-18",
      "description": "New Sneakers",
      "category": "Shopping",
      "type": "expense",
      "amount": 140
    },
    {
      "id": "95",
      "date": "2025-09-22",
      "description": "Electricity Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 125
    },
    {
      "id": "96",
      "date": "2025-09-25",
      "description": "Phone Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 55
    },
    {
      "id": "97",
      "date": "2025-09-28",
      "description": "Gym Renewal",
      "category": "Healthcare",
      "type": "expense",
      "amount": 45
    },
    {
      "id": "98",
      "date": "2025-10-01",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5800
    },
    {
      "id": "99",
      "date": "2025-10-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1450
    },
    {
      "id": "100",
      "date": "2025-10-07",
      "description": "Weekly Groceries",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 115.25
    },
    {
      "id": "101",
      "date": "2025-10-12",
      "description": "Freelance Design Project",
      "category": "Freelance",
      "type": "income",
      "amount": 1350
    },
    {
      "id": "102",
      "date": "2025-10-16",
      "description": "Halloween Costume",
      "category": "Shopping",
      "type": "expense",
      "amount": 65
    },
    {
      "id": "103",
      "date": "2025-10-18",
      "description": "Winter Coat",
      "category": "Shopping",
      "type": "expense",
      "amount": 189
    },
    {
      "id": "104",
      "date": "2025-10-22",
      "description": "Dentist Appointment",
      "category": "Healthcare",
      "type": "expense",
      "amount": 200
    },
    {
      "id": "105",
      "date": "2025-10-25",
      "description": "Internet Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 79.99
    },
    {
      "id": "106",
      "date": "2025-10-28",
      "description": "Bus Pass",
      "category": "Transportation",
      "type": "expense",
      "amount": 65
    },
    {
      "id": "107",
      "date": "2025-11-01",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5800
    },
    {
      "id": "108",
      "date": "2025-11-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1450
    },
    {
      "id": "109",
      "date": "2025-11-08",
      "description": "Thanksgiving Groceries",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 210.50
    },
    {
      "id": "110",
      "date": "2025-11-12",
      "description": "Black Friday Shopping",
      "category": "Shopping",
      "type": "expense",
      "amount": 345
    },
    {
      "id": "111",
      "date": "2025-11-15",
      "description": "Freelance Mobile App",
      "category": "Freelance",
      "type": "income",
      "amount": 900
    },
    {
      "id": "112",
      "date": "2025-11-18",
      "description": "Heating Bill",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 180
    },
    {
      "id": "113",
      "date": "2025-11-22",
      "description": "Movie Marathon",
      "category": "Entertainment",
      "type": "expense",
      "amount": 45
    },
    {
      "id": "114",
      "date": "2025-11-25",
      "description": "Uber Rides",
      "category": "Transportation",
      "type": "expense",
      "amount": 42
    },
    {
      "id": "115",
      "date": "2025-11-28",
      "description": "Flu Medicine",
      "category": "Healthcare",
      "type": "expense",
      "amount": 55
    },
    {
      "id": "116",
      "date": "2025-12-01",
      "description": "Monthly Salary",
      "category": "Salary",
      "type": "income",
      "amount": 5800
    },
    {
      "id": "117",
      "date": "2025-12-03",
      "description": "Apartment Rent",
      "category": "Rent",
      "type": "expense",
      "amount": 1450
    },
    {
      "id": "118",
      "date": "2025-12-08",
      "description": "Holiday Groceries",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 175
    },
    {
      "id": "119",
      "date": "2025-12-10",
      "description": "Christmas Gifts",
      "category": "Shopping",
      "type": "expense",
      "amount": 420
    },
    {
      "id": "120",
      "date": "2025-12-14",
      "description": "Year End Bonus",
      "category": "Salary",
      "type": "income",
      "amount": 3000
    },
    {
      "id": "121",
      "date": "2025-12-18",
      "description": "Investment Dividend",
      "category": "Investment",
      "type": "income",
      "amount": 800
    },
    {
      "id": "122",
      "date": "2025-12-20",
      "description": "Heating and Electric",
      "category": "Bills & Utilities",
      "type": "expense",
      "amount": 195
    },
    {
      "id": "123",
      "date": "2025-12-23",
      "description": "Holiday Dinner Out",
      "category": "Food & Dining",
      "type": "expense",
      "amount": 135
    },
    {
      "id": "124",
      "date": "2025-12-25",
      "description": "New Year Party",
      "category": "Entertainment",
      "type": "expense",
      "amount": 150
    },
    {
      "id": "125",
      "date": "2025-12-28",
      "description": "Taxi Rides",
      "category": "Transportation",
      "type": "expense",
      "amount": 65
    }
  ]

export const initialCategories : Category[] = [
  { "id": "1", "name": "Food & Dining", "color": "#F59E0B", "icon": "🍔", "type": "expense" },
  { "id": "2", "name": "Transportation", "color": "#3B82F6", "icon": "🚗", "type": "expense" },
  { "id": "3", "name": "Shopping", "color": "#EC4899", "icon": "🛍️", "type": "expense" },
  { "id": "4", "name": "Entertainment", "color": "#8B5CF6", "icon": "🎬", "type": "expense" },
  { "id": "5", "name": "Bills & Utilities", "color": "#EF4444", "icon": "💡", "type": "expense" },
  { "id": "6", "name": "Healthcare", "color": "#10B981", "icon": "🏥", "type": "expense" },
  { "id": "7", "name": "Education", "color": "#06B6D4", "icon": "📚", "type": "expense" },
  { "id": "8", "name": "Rent", "color": "#F97316", "icon": "🏠", "type": "expense" },
  { "id": "9", "name": "Salary", "color": "#22C55E", "icon": "💰", "type": "income" },
  { "id": "10", "name": "Freelance", "color": "#14B8A6", "icon": "💻", "type": "income" },
  { "id": "11", "name": "Investment", "color": "#6366F1", "icon": "📈", "type": "income" },
  { "id": "12", "name": "Other", "color": "#6B7280", "icon": "📦", "type": "both" }
];