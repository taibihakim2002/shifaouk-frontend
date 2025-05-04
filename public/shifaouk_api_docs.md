
# 🩺 Shifaouk API Documentation

## Base URL
```
https://api.shifaouk.com/api
```

---

## 📋 Endpoint: `/doctors`

### ✔️ Description:
This endpoint retrieves a list of doctors. You can apply filters, sorting, field selection, and pagination.

---

## 🔍 Query Parameters

### 1. Filtering (Basic & Advanced)
- Filter by any field such as `specialty`, `price`, etc.

#### Examples:
```
/doctors?specialty=cardiology
/doctors?price[lt]=1000
/doctors?price[gte]=500&price[lte]=1000
```

### 2. Sorting
- Sort results by any field.
- Use `-` for descending order.

#### Examples:
```
/doctors?sort=price
/doctors?sort=-rating
/doctors?sort=price,-rating
```

### 3. Field Limiting
- Choose which fields to include in the response.

#### Example:
```
/doctors?fields=name,price,specialty
```

### 4. Pagination
- Control which page and how many results per page.

#### Example:
```
/doctors?page=2&limit=10
```

---

## 🔗 Full Example
```
/doctors?specialty=dermatology&price[lt]=1000&sort=price,-rating&fields=name,price,specialty&page=1&limit=5
```

---

## 🛠️ Notes
- Always URL encode values if sending from frontend JavaScript.
- Backend uses MongoDB-style operators: `lt`, `lte`, `gt`, `gte`.
