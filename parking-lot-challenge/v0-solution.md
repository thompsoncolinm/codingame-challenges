using System;

// To execute C#, please define "static void Main" on a class // named Solution.

```C#
class Solution { static void Main(string[] args) { for (var i = 0; i < 5; i++) { Console.WriteLine("Hello, World"); } }

static void Par
}
```

Hey candidate! Welcome to your interview. Boilerplate is provided. Feel free to change the code as you see fit. To run the code at any time, please hit the run button located in the top left corner.

Goals: Design a parking lot using object-oriented principles

Here are a few methods that you should be able to run:

Tell us how many spots are remaining Tell us how many total spots are in the parking lot Tell us when the parking lot is full Tell us when the parking lot is empty Tell us when certain spots are full e.g. when all motorcycle spots are taken Tell us how many spots vans are taking up Assumptions:

The parking lot can hold motorcycles, cars and vans The parking lot has motorcycle spots, car spots and large spots A motorcycle can park in any spot A car can park in a single compact spot, or a regular spot A van can park, but it will take up 3 regular spots These are just a few assumptions. Feel free to ask your interviewer about more assumptions as needed




I'll design a parking lot system using object-oriented principles in C#. I'll start by defining the necessary classes and then implement the required functionality.

```C#
using System;
using System.Collections.Generic;

// Enum to represent different types of vehicles
public enum VehicleType
{
    Motorcycle,
    Car,
    Van
}

// Enum to represent different types of parking spots
public enum SpotType
{
    Motorcycle,
    Compact,
    Large
}

// Class to represent a vehicle
public class Vehicle
{
    public VehicleType Type { get; set; }
    public string LicensePlate { get; set; }

    public Vehicle(VehicleType type, string licensePlate)
    {
        Type = type;
        LicensePlate = licensePlate;
    }
}

// Class to represent a parking spot
public class ParkingSpot
{
    public SpotType Type { get; set; }
    public bool IsOccupied { get; set; }
    public Vehicle ParkedVehicle { get; set; }

    public ParkingSpot(SpotType type)
    {
        Type = type;
        IsOccupied = false;
        ParkedVehicle = null;
    }
}

// Class to represent the parking lot
public class ParkingLot
{
    private List<ParkingSpot> spots;

    public ParkingLot(int motorcycleSpots, int compactSpots, int largeSpots)
    {
        spots = new List<ParkingSpot>();

        for (int i = 0; i < motorcycleSpots; i++)
            spots.Add(new ParkingSpot(SpotType.Motorcycle));

        for (int i = 0; i < compactSpots; i++)
            spots.Add(new ParkingSpot(SpotType.Compact));

        for (int i = 0; i < largeSpots; i++)
            spots.Add(new ParkingSpot(SpotType.Large));
    }

    public int GetRemainingSpots()
    {
        return spots.Count(s => !s.IsOccupied);
    }

    public int GetTotalSpots()
    {
        return spots.Count;
    }

    public bool IsFull()
    {
        return GetRemainingSpots() == 0;
    }

    public bool IsEmpty()
    {
        return GetRemainingSpots() == GetTotalSpots();
    }

    public bool AreAllMotorcycleSpotsTaken()
    {
        return spots.Where(s => s.Type == SpotType.Motorcycle).All(s => s.IsOccupied);
    }

    public int GetVanOccupiedSpots()
    {
        return spots.Count(s => s.IsOccupied && s.ParkedVehicle?.Type == VehicleType.Van) * 3;
    }

    public bool ParkVehicle(Vehicle vehicle)
    {
        switch (vehicle.Type)
        {
            case VehicleType.Motorcycle:
                return ParkMotorcycle(vehicle);
            case VehicleType.Car:
                return ParkCar(vehicle);
            case VehicleType.Van:
                return ParkVan(vehicle);
            default:
                return false;
        }
    }

    private bool ParkMotorcycle(Vehicle motorcycle)
    {
        var spot = spots.FirstOrDefault(s => !s.IsOccupied);
        if (spot != null)
        {
            spot.IsOccupied = true;
            spot.ParkedVehicle = motorcycle;
            return true;
        }
        return false;
    }

    private bool ParkCar(Vehicle car)
    {
        var spot = spots.FirstOrDefault(s => !s.IsOccupied && (s.Type == SpotType.Compact || s.Type == SpotType.Large));
        if (spot != null)
        {
            spot.IsOccupied = true;
            spot.ParkedVehicle = car;
            return true;
        }
        return false;
    }

    private bool ParkVan(Vehicle van)
    {
        var availableLargeSpots = spots.Where(s => s.Type == SpotType.Large && !s.IsOccupied).ToList();
        if (availableLargeSpots.Count >= 3)
        {
            for (int i = 0; i < 3; i++)
            {
                availableLargeSpots[i].IsOccupied = true;
                availableLargeSpots[i].ParkedVehicle = van;
            }
            return true;
        }
        return false;
    }
}

class Solution
{
    static void Main(string[] args)
    {
        // Create a parking lot with 5 motorcycle spots, 10 compact spots, and 15 large spots
        ParkingLot parkingLot = new ParkingLot(5, 10, 15);

        Console.WriteLine($"Total spots: {parkingLot.GetTotalSpots()}");
        Console.WriteLine($"Remaining spots: {parkingLot.GetRemainingSpots()}");
        Console.WriteLine($"Is empty: {parkingLot.IsEmpty()}");

        // Park some vehicles
        Vehicle motorcycle1 = new Vehicle(VehicleType.Motorcycle, "M001");
        Vehicle car1 = new Vehicle(VehicleType.Car, "C001");
        Vehicle van1 = new Vehicle(VehicleType.Van, "V001");

        parkingLot.ParkVehicle(motorcycle1);
        parkingLot.ParkVehicle(car1);
        parkingLot.ParkVehicle(van1);

        Console.WriteLine($"Remaining spots after parking: {parkingLot.GetRemainingSpots()}");
        Console.WriteLine($"Is full: {parkingLot.IsFull()}");
        Console.WriteLine($"All motorcycle spots taken: {parkingLot.AreAllMotorcycleSpotsTaken()}");
        Console.WriteLine($"Spots occupied by vans: {parkingLot.GetVanOccupiedSpots()}");
    }
}
```

This implementation covers all the required functionality:

1. We have classes for `Vehicle`, `ParkingSpot`, and `ParkingLot`.
2. The `ParkingLot` class has methods to:

1. Get remaining spots
2. Get total spots
3. Check if the lot is full
4. Check if the lot is empty
5. Check if all motorcycle spots are taken
6. Get the number of spots vans are taking up



3. The parking system handles different types of vehicles and spots:

1. Motorcycles can park in any spot
2. Cars can park in compact or large spots
3. Vans take up 3 large spots





To run and test the code, you can use the `Main` method provided. It creates a parking lot, parks some vehicles, and demonstrates the usage of various methods.

Feel free to ask any questions or request any modifications to the implementation!