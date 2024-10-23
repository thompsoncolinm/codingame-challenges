using System;
using System.Collections.Generic;
using System.Linq;

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