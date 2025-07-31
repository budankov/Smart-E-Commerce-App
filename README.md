<h1 align="center">🛒 Smart E-Commerce App</h1>

# 🛍️ Simple React Native Store App  (pet project)

Цей застосунок — pet-проєкт на базі **React Native + Expo**, що демонструє повноцінну e-commerce логіку:  
авторизацію через Firebase, локалізацію, додавання товарів у кошик, перегляд замовлень та інше.

## 🔐 Аутентифікація

- Реалізовано логін та реєстрацію через **Firebase Auth**.
- Перевірка полів з використанням **Yup** + **react-hook-form** + **@hookform/resolvers**.
- Повідомлення про успішну/невдалу авторизацію через **react-native-flash-message**.

<p float="left">
  <img src="https://i.postimg.cc/13RD3Vm0/2025-07-31-23-32-46.jpg" width="300" />
  <img src="https://i.postimg.cc/W19gFpzB/2025-07-31-23-32-51.jpg" width="300" />
</p>

---

## 🏠 Домашній екран

- Завантаження товарів з **Firebase Firestore**.
- Виведення товарів на головному екрані.

<img src="https://i.postimg.cc/wvNmGh2z/2025-07-31-23-32-54.jpg" width="300" />

---

## 🛒 Кошик

- Якщо кошик порожній — відображається окремий екран.
- Додавання та збереження товарів у кошик.
- Кошик працює через Redux + redux-persist.

<p float="left">
  <img src="https://i.postimg.cc/BvkFphxN/2025-07-31-23-32-56.jpg" width="300" />
  <img src="https://i.postimg.cc/prYn2R31/2025-07-31-23-33-02.jpg" width="300" />
</p>

---

## ✅ Оформлення замовлення

- Оформлення замовлення із збереженням у Firestore.
- Повідомлення про успішну операцію.

<p float="left">
  <img src="https://i.postimg.cc/y6FRhyWX/2025-07-31-23-33-07.jpg" width="300" />
  <img src="https://i.postimg.cc/sDshTGhF/2025-07-31-23-33-09.jpg" width="300" />
</p>

---

## 📦 Мої замовлення

- Замовлення підвантажуються з Firestore.
- Час замовлення форматовано з використанням **moment.js**.

<img src="https://i.postimg.cc/GhKsV3F4/2025-07-31-23-33-12.jpg" width="300" />

---

## 👤 Профіль

- Екран профілю з кнопками: Мої замовлення, Зміна мови, Вийти.
- Реалізована навігація через **react-navigation** (stack + bottom-tabs).

<img src="https://i.postimg.cc/BvXDxW1X/2025-07-31-23-32-59.jpg" width="300" />

---

## 🌐 Локалізація

- Застосунок підтримує **багатомовність** (UA/EN) завдяки **i18next** та **react-i18next**.
- Зміна мови через UI, збереження вибору мов у AsyncStorage.

<p float="left">
  <img src="https://i.postimg.cc/DwzbTV6B/2025-07-31-23-33-14.jpg" width="300" />
  <img src="https://i.postimg.cc/MprfZsrx/2025-07-31-23-33-17.jpg" width="300" />
</p>
