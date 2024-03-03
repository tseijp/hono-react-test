import { useRef } from "react";
import { createRoot } from "react-dom/client";
import { Doc } from "yjs";

const useOnce = <T, Args extends any[] = any[]>(callback: (...args: Args) => T, args?: Args) => {
  if (!args) args = [] as unknown as Args;
  const ref = useRef<T>();
  return ref.current ?? (ref.current = callback(...args));
}

const App = () => {
  const doc = useOnce(() => new Doc())

  // useOnce(() => new WebsocketProvider("/editor", "1", doc))

  const handleChange = useOnce(() => <E extends Event>({ target }: E) => {
    if (!target || !("value" in target)) return;
    doc.getArray("messages").insert(0, [target.value]);
  });

  const ref = useOnce(() => (el: null | HTMLTextAreaElement) => {
    if (!el) return

    el.addEventListener("input", handleChange)

    doc.getArray("messages").observe(() => {
      el.textContent = doc.getArray("messages").toArray().join("\n")
    });
  })

  return <textarea ref={ref} style={{ top: 0, left: 0, position: "fixed", height: "100vh" }} />
}

createRoot(document.getElementById("root")!).render(<App />);