# Raahi

### Your route. Their parcel. One shared journey.

Raahi is a community-powered local delivery platform that connects people who need to send parcels with verified travellers who are already moving in the same direction.

Instead of creating a separate delivery trip for every parcel, Raahi uses **existing journeys and unused carrying capacity** of people travelling by walking, bicycle, bike, auto, or car.

The result is a delivery model designed around **shared journeys, route compatibility, affordable pricing, flexible delivery, and trust-focused handovers**.

> **Existing Journey + Unused Capacity = Local Delivery**

---

## 1. Problem Statement

### The Last-Mile Delivery Problem

Last-mile delivery is the final movement of a parcel from a local shop, hub, or pickup location to the recipient. It is one of the most difficult parts of the delivery process because a separate vehicle or delivery partner may need to make an additional trip for every individual parcel.

This creates several problems.

### 1.1 High Delivery Cost

Sending a small parcel can be expensive because the delivery cost is not only related to the parcel itself.

A dedicated delivery trip can involve:

- Fuel costs
- Driver/partner costs
- Vehicle maintenance
- Route inefficiency
- Time spent travelling
- Operational overhead

For small local deliveries, these costs can make delivery less affordable.

### 1.2 Underutilized Existing Journeys

Every day, thousands of people are already travelling between different locations:

- Students going to college
- Employees travelling to work
- People travelling home
- Bike riders travelling across the city
- Auto drivers moving between locations
- Car owners travelling to another area

Many of these journeys have unused space in a backpack, vehicle, boot, or other carrying capacity.

The journey is already happening, but the unused capacity is not being utilized.

### 1.3 Limited Delivery Availability

Traditional delivery services may not always be convenient for:

- Small local shops
- Short-distance deliveries
- Remote areas
- Tier-2 and Tier-3 cities
- Narrow or difficult-to-access streets
- Time-sensitive local deliveries
- Individual people sending personal items

Customers may have to wait for a traditional courier even when someone is already travelling toward the required destination.

### 1.4 Unnecessary Additional Trips

When a dedicated delivery vehicle is dispatched for every parcel, additional trips are created.

This can contribute to:

- More vehicles on roads
- Increased congestion
- Higher fuel consumption
- Additional emissions
- Less efficient utilization of existing transportation

### 1.5 Trust and Security

A community delivery model also introduces an important challenge:

**How can a customer safely hand a parcel to another traveller?**

Without proper verification, there can be risks involving:

- Wrong parcel pickup
- False delivery confirmation
- Delayed delivery
- Payment disputes
- Unverified delivery partners
- Lack of visibility during transit

Therefore, a successful community delivery platform needs both **efficient matching** and **trust mechanisms**.

---

# 2. Raahi Solution

Raahi solves this problem by turning **existing journeys into a shared delivery network**.

Instead of sending a dedicated delivery vehicle, Raahi attempts to connect a parcel with a suitable person who is already travelling toward the destination.

### Core Idea

```text
                 CUSTOMER
                    │
                    ▼
             Send a Parcel
                    │
                    ▼
          Pickup + Destination
                    │
                    ▼
            Route Calculation
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
       Distance             Route
          │                   │
          └─────────┬─────────┘
                    ▼
           Price + ETA
                    │
                    ▼
          Find Raahi Partner
                    │
          Route + Time + Capacity
                    │
                    ▼
           Partner Accepts
                    │
                    ▼
              Pickup OTP
                    │
                    ▼
             Parcel Picked
                    │
                    ▼
            Live Tracking
                    │
                    ▼
            Delivery OTP
                    │
                    ▼
          Delivery Completed
                    │
                    ▼
            Payment Released
                    │
                    ▼
             Wallet Updated