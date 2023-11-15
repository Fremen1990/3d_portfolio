import { ChangeEvent, FormEvent, Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import emailjs from "@emailjs/browser";

import { Fox } from "../models";
import { Alert, Loader } from "../components";
import { useAlert } from "../hooks/useAlert.ts";

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null); // Updated to specify HTMLFormElement
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const { showAlert, alert, hideAlert } = useAlert();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");

    if (formRef.current) {
      emailjs
        .sendForm(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          formRef.current, // Pass the form reference
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        )
        .then((result) => {
          console.log(result.text);
          setTimeout(() => {
            setCurrentAnimation("idle");
            showAlert({
              show: true,
              text: "Message sent successfully!",
              type: "success",
            });
            setIsLoading(false);
            clearForm();
          }, 4000);

          setTimeout(() => {
            hideAlert();
          }, 7000);
        })
        .catch((error) => {
          console.log(error.text);
          showAlert({
            show: true,
            text: "Something went wrong, try again later!",
            type: "danger",
          });
          clearForm();
          setCurrentAnimation("idle");
          setIsLoading(false);
          setTimeout(() => {
            hideAlert();
          }, 5000);
        });
    }
  };

  const clearForm = () => {
    setForm({ name: "", email: "", message: "" });
  };

  const handleFocus = () => {
    setCurrentAnimation("walk");
  };
  const handleBlur = () => {};

  return (
    <section className="relative flex lg:flex-row flex-col max-container h-[100vh]">
      {alert.show && <Alert {...alert} />}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>

        <form
          ref={formRef}
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-7 mt-14"
        >
          <label htmlFor="" className="text-black font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={isLoading}
            />
          </label>

          <label htmlFor="" className="text-black font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="john@email.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={isLoading}
            />
          </label>

          <label htmlFor="" className="text-black font-semibold">
            Message
            <textarea
              name="message"
              rows={5}
              className="textarea"
              placeholder="Let me know about your project, needs or just say hi!"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={isLoading}
            />
          </label>

          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <directionalLight intensity={2} position={[0, 0, 1]} />
          <ambientLight intensity={0.3} />
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};
