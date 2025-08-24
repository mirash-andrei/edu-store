<script setup>
import { defineProps, defineEmits } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const props = defineProps({ product: Object });
const emit = defineEmits(["close"]);

const countries = [
  { value: "ru", text: "Россия" },
  { value: "by", text: "Белорусь" },
  { value: "kz", text: "Казахстан" },
];

const formSchema = yup.object({
  userName: yup.string().required("Это поле обязательно"),
  userEmail: yup
    .string()
    .email("Неверный email")
    .required("Это поле обязательно"),
  selectedCountry: yup.string().required("Выберите страну"),
  userAddress: yup.string().required("Это поле обязательно"),
  agreed: yup.boolean().oneOf([true], "Вы должны согласиться с условиями"),
});

function closeModal() {
  emit("close");
}

async function onSubmit(values) {
  const orderData = {
    productId: props.product.id,
    name: values.userName,
    email: values.userEmail,
    country: values.selectedCountry,
    address: values.userAddress,
    agreed: values.agreed,
  };

  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Ошибка при отправке");

    const result = await response.json();
    console.log("Ответ от сервера:", result);

    alert("Заказ оформлен успешно!");
    closeModal();
  } catch (err) {
    console.error(err);
    alert("Произошла ошибка при оформлении заказа");
  }
}
</script>

<template>
  <transition name="fade">
    <div class="modal-overlay" @click.self="closeModal">
      <div class="order-form-wrapper">
        <Form :validation-schema="formSchema" @submit="onSubmit">
          <button class="close-btn" @click="closeModal">✕</button>
          <h3>Оформить заказ на {{ props.product.title }}</h3>

          <div class="form-group">
            <label>ФИО</label>
            <Field name="userName" v-slot="{ field }">
              <input type="text" v-bind="field" />
            </Field>
            <ErrorMessage name="userName" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <Field name="userEmail" v-slot="{ field }">
              <input type="text" v-bind="field" />
            </Field>
            <ErrorMessage name="userEmail" />
          </div>

          <div class="form-group">
            <label>Страна</label>
            <Field name="selectedCountry" as="select">
              <option value="" disabled>Выберете страну</option>
              <option
                v-for="country in countries"
                :key="country.value"
                :value="country.value"
              >
                {{ country.text }}
              </option>
            </Field>
            <ErrorMessage name="selectedCountry" />
          </div>

          <div class="form-group">
            <label>Адрес</label>
            <Field name="userAddress" v-slot="{ field }">
              <input type="text" v-bind="field" />
            </Field>
            <ErrorMessage name="userAddress" />
          </div>

          <div class="form-group checkbox-group">
            <Field
              name="agreed"
              type="checkbox"
              :value="true"
              v-slot="{ field }"
            >
              <input type="checkbox" v-bind="field" id="agreement" />
            </Field>
            <label for="agreement"
              >Я даю согласие на обработку персональных данных</label
            >
            <ErrorMessage name="agreed" />
          </div>

          <button class="submit-btn" type="submit">Отправить</button>
        </Form>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.order-form-wrapper {
  position: relative;
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 16px;

  .close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #555;
    transition: color 0.2s;

    &:hover {
      color: #000;
    }
  }

  h3 {
    padding-right: 10px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 14px;
      color: #555;
    }

    input[type="text"],
    select {
      padding: 10px 12px;
      font-size: 14px;
      border: 1px solid #ddd;
      border-radius: 6px;
      outline: none;
      transition: border 0.2s;

      &:focus {
        border-color: #4cafef;
      }
    }

    .vee-error {
      color: #ff4d4f;
      font-size: 12px;
      margin-top: 2px;
    }

    &.checkbox-group {
      flex-direction: row;
      align-items: center;
      gap: 8px;

      input[type="checkbox"] {
        width: 16px;
        height: 16px;
      }
    }
  }

  .submit-btn {
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
