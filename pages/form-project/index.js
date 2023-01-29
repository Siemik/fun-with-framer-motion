import { useState, useEffect } from "react"
import { motion, MotionConfig } from "framer-motion"
import useMeasure from "react-use-measure"

function Step({ step, currentStep }) {
  let status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete"

  return (
    <div className="relative">
      <motion.div
        animate={status}
        transition={{
          duration: 0.4,
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
        }}
        variants={{
          active: {
            scale: 1,
            opacity: 0,
            transition: {
              delay: 0,
              duration: 0.1,
            },
          },
          complete: {
            scale: 1.25,
            opacity: 1,
          },
        }}
        className="absolute inset-0 rounded-full bg-orange-200"
      ></motion.div>
      <motion.div
        animate={status}
        // transition={{ duration: 0.4 }}
        variants={{
          inactive: {
            backgroundColor: "var(--white)",
            borderColor: "var(--stone-300)",
            color: "var(--stone-300)",
          },
          active: {
            backgroundColor: "var(--white)",
            borderColor: "var(--orange-500)",
            color: "var(--orange-500)",
          },
          complete: {
            backgroundColor: "var(--orange-500)",
            borderColor: "var(--orange-500)",
            color: "var(--orange-500)",
          },
        }}
        initial={{
          backgroundColor: "var(--white)",
          borderColor: "var(--white)",
          color: "var(--white)",
        }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold"
      >
        <div className="flex items-center justify-center">
          {status === "complete" ? (
            <CheckIcon className="h-6 w-6 text-white" />
          ) : (
            <span>{step}</span>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        animate={{ pathLength: 1 }}
        initial={{ pathLength: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

export default function Page() {
  const [step, setStep] = useState(1)
  const [isChecked, setIsChecked] = useState(false)
  const [isSended, setIsSended] = useState(false)
  const [ref, { height }] = useMeasure()

  useEffect(() => {
    // Update the document title using the browser API
    if (step < 5) {
      setIsChecked(false)
    }
  }),
    [step]

  function hendleButton() {
    setStep(step > 4 ? step : step + 1)
    if (step > 4 && isChecked) {
      setIsSended(true)
    }
  }

  return (
    <MotionConfig transition={{ duration: 0.15 }}>
      <div className="flex min-h-screen items-start bg-gradient-to-br from-stone-700 to-stone-900 px-1 pt-40">
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="mx-auto w-full max-w-md rounded-2xl bg-white"
        >
          <div className="flex justify-between rounded p-8">
            <Step step={1} currentStep={step} />
            <Step step={2} currentStep={step} />
            <Step step={3} currentStep={step} />
            <Step step={4} currentStep={step} />
          </div>
          <motion.div
            className="overflow-hidden"
            animate={{ height }}
            initial={{ height: "212px" }}
            transition={{
              bounce: 0,
              type: "tween",
              ease: "easeOut",
            }}
          >
            <div className="px-8 pb-8" ref={ref}>
              <div>
                <div className="mt-2 h-6 w-40 rounded bg-stone-100" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-5/6 rounded bg-stone-100" />
                  <div className="h-4 rounded bg-stone-100" />
                  <div className="h-4 w-4/6 rounded bg-stone-100" />
                </div>
              </div>

              <div className="mt-10 flex justify-between">
                <motion.button
                  onClick={() => setStep(step < 2 ? step : step - 1)}
                  className="rounded px-2 py-1 text-stone-400 hover:text-stone-700"
                  animate={{ opacity: isSended ? 0 : 1 }}
                >
                  Cofnij
                </motion.button>

                <motion.button
                  animate={{
                    opacity:
                      step <= 4
                        ? 1
                        : step > 4 && !isChecked
                        ? 0.5
                        : step > 4 && isChecked
                        ? 1
                        : 1,
                  }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  // transition={{ duration: 1 }}
                  onClick={hendleButton}
                  className={`${
                    step > 4 && !isChecked
                      ? "pointer-events-none opacity-50"
                      : step > 4 && isSended
                      ? "pointer-events-none"
                      : ""
                  } bg flex items-center justify-center rounded-full bg-orange-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-orange-600 active:bg-orange-700`}
                >
                  <div className=" flex items-center justify-center">
                    {step > 4 && isChecked && isSended ? (
                      <>
                        <span className="flex gap-2">
                          <motion.p
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                          >
                            Poszło
                          </motion.p>{" "}
                          <CheckIcon className="h-6 w-6 text-white" />
                        </span>
                      </>
                    ) : (
                      <span>{step > 4 ? "Prześlij" : "Dalej"}</span>
                    )}
                  </div>
                </motion.button>
              </div>
              {step > 4 && !isSended && (
                <motion.div
                  className="flex items-center justify-end pt-4 pr-1"
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <span className="pr-1 text-sm text-stone-700">
                    Akceptuje regulamin{" "}
                  </span>
                  <input
                    type="checkbox"
                    class="appearance-none text-orange-500 default:ring-2 indeterminate:bg-gray-300"
                    value={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    id="subscribe"
                    name="subscribe"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  )
}
