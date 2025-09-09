import { config } from "dotenv";
import connectDB from "../db/index.db.js";
import { User } from "../models/user.models.js";

config();

// Seed users - Indian context
const seedUsers = [
  {
    email: "arjun.sharma@example.com",
    fullName: "Arjun Sharma",
    password: "Arjun@1234",
    profilePic: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    email: "priya.kapoor@example.com",
    fullName: "Priya Kapoor",
    password: "Priya@5678",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    email: "rahul.mehta@example.com",
    fullName: "Rahul Mehta",
    password: "Rahul@9101",
    profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    email: "ananya.singh@example.com",
    fullName: "Ananya Singh",
    password: "Ananya@234",
    profilePic: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    email: "vikram.verma@example.com",
    fullName: "Vikram Verma",
    password: "Vikram@789",
    profilePic: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    email: "isha.patel@example.com",
    fullName: "Isha Patel",
    password: "Isha@3456",
    profilePic: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    email: "siddharth.jain@example.com",
    fullName: "Siddharth Jain",
    password: "Siddh@890",
    profilePic: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    email: "tanya.gupta@example.com",
    fullName: "Tanya Gupta",
    password: "Tanya@123",
    profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    email: "aditya.nair@example.com",
    fullName: "Aditya Nair",
    password: "Aditya@456",
    profilePic: "https://randomuser.me/api/portraits/men/69.jpg",
  },
  {
    email: "rhea.malik@example.com",
    fullName: "Rhea Malik",
    password: "Rhea@7890",
    profilePic: "https://randomuser.me/api/portraits/women/69.jpg",
  },
  {
    email: "ankit.saxena@example.com",
    fullName: "Ankit Saxena",
    password: "Ankit@2345",
    profilePic: "https://randomuser.me/api/portraits/men/70.jpg",
  },
  {
    email: "meera.chopra@example.com",
    fullName: "Meera Chopra",
    password: "Meera@5678",
    profilePic: "https://randomuser.me/api/portraits/women/70.jpg",
  },
  {
    email: "rahul.kumar@example.com",
    fullName: "Rahul Kumar",
    password: "Rahul@9012",
    profilePic: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    email: "sana.rathi@example.com",
    fullName: "Sana Rathi",
    password: "Sana@3456",
    profilePic: "https://randomuser.me/api/portraits/women/71.jpg",
  },
  {
    email: "vivek.chawla@example.com",
    fullName: "Vivek Chawla",
    password: "Vivek@7891",
    profilePic: "https://randomuser.me/api/portraits/men/72.jpg",
  },
  {
    email: "anya.mehta@example.com",
    fullName: "Anya Mehta",
    password: "Anya@1234",
    profilePic: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    email: "dev.raj@example.com",
    fullName: "Dev Raj",
    password: "Dev@5678",
    profilePic: "https://randomuser.me/api/portraits/men/73.jpg",
  },
  {
    email: "kiara.singh@example.com",
    fullName: "Kiara Singh",
    password: "Kiara@9012",
    profilePic: "https://randomuser.me/api/portraits/women/73.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Optional: Delete old users before seeding
    await User.deleteMany({});
    console.log("Old users deleted");

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully with Indian users");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
