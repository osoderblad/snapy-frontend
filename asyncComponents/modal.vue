<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-[100]">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/60" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="h-[80svh] w-full overflow-y-auto max-w-3xl transform overflow-hidden rounded-xl bg-secondary p-3 lg:p-6 text-left align-middle shadow-xl transition-all border-slate-200 border-opacity-15 border-1">
              <div class="prose nunito">
                <h3>
                  Terms of Use and Liability Waiver for Breathwork Library
                  Access
                </h3>
                <h1>
                  Terms of Use and Liability Waiver for Breath-Pharmacy Library
                  Access
                </h1>
                <p>
                  By accessing the online breath-pharmacy library, you
                  acknowledge and agree to the following terms:
                </p>
                <ol>
                  <li>
                    <strong>Medical Disclaimer:</strong>
                    The breathwork practices provided in this library are for
                    informational purposes only and are not intended to replace
                    professional medical advice, diagnosis, or treatment. Always
                    seek the advice of your physician or other qualified health
                    provider with any questions you may have regarding a medical
                    condition.
                  </li>
                  <li>
                    <strong>Voluntary Participation:</strong>
                    Participation in any breathwork session is voluntary. If you
                    experience any adverse reactions, stop immediately and
                    consult a healthcare professional.
                  </li>
                  <li>
                    <strong>Assumption of Risk:</strong>
                    You understand that breathwork practices involve certain
                    risks, including but not limited to physical exertion,
                    emotional release, and altered states of consciousness. By
                    participating, you voluntarily assume full responsibility
                    for any risks or injuries, whether physical or mental.
                  </li>
                  <li>
                    <strong>No Guarantees:</strong>
                    The effectiveness of breathwork can vary from person to
                    person. We do not guarantee specific results from these
                    practices.
                  </li>
                  <li>
                    <strong>Liability Release:</strong>
                    By accessing the breathwork library, you release the
                    creators, instructors, and affiliates from any liability for
                    any injuries, losses, or damages that may result from your
                    participation in these practices.
                  </li>
                  <li>
                    <strong>Personal Responsibility:</strong>
                    You agree to practice breathwork in a safe environment, free
                    from distractions, and ensure that you are in good health
                    before beginning any session. If you have any pre-existing
                    conditions, consult with a healthcare provider before
                    starting.
                  </li>
                  <li>
                    <strong>Age Requirement:</strong>
                    You confirm that you are at least 18 years old or have the
                    consent of a parent or guardian to use these resources.
                  </li>
                  <li>
                    <strong>Privacy:</strong>
                    Your personal information will be handled in accordance with
                    our privacy policy. We are committed to protecting your data
                    and will not share it with third parties without your
                    consent.
                  </li>
                  <li>
                    <strong>Health Conditions:</strong>
                    Breathwork sessions may not be suitable if you have certain
                    conditions, including but not limited to cardiovascular
                    problems, abnormally high blood pressure, aneurysms,
                    epilepsy or a history of seizures, anyone taking heavy
                    medication, severe psychiatric symptoms, especially
                    psychosis or paranoia, bipolar disorder, osteoporosis,
                    recent surgery, glaucoma, pregnancy, untreated mental
                    illness or inadequate support for mental health conditions,
                    experiencing an acute emotional or spiritual crisis, asthma
                    (participants with asthma should bring their own inhaler and
                    consult with their physician and breathwork session
                    instructor before participating). This list is not
                    exhaustive. If you have any health concerns not listed here,
                    consult a physician before participating in breathwork
                    sessions.
                  </li>
                  <li>
                    <strong>Health Certification:</strong>
                    By participating, you warrant and represent that you are in
                    good physical, mental, psychological, and emotional health.
                    If you are not in good health, you agree not to participate
                    in the sessions. This certification is a material agreement
                    that allows your participation.
                  </li>
                  <li>
                    <strong>Facilitator Role:</strong>
                    You acknowledge that the person facilitating the breathwork
                    sessions is not a doctor, psychiatrist, or specialist in
                    healthcare. The activities offered are not intended to
                    diagnose or treat specific medical conditions, whether
                    physical, psychological, or emotional.
                  </li>
                  <li>
                    <strong>Assumption of Consequences:</strong>
                    You voluntarily participate in these activities,
                    understanding the risks and consequences, and agree to
                    assume all consequences, known or unknown.
                  </li>
                  <li>
                    <strong>Liability Release of Trainer:</strong>
                    You release trainer Robin Westerberg from all
                    responsibilities, costs, and damages that may arise from
                    participating in the breathwork activities.
                  </li>
                  <li>
                    <strong>Financial Responsibility:</strong>
                    You agree to accept financial responsibility for any costs
                    related to treatment that may arise from participating in
                    breathwork sessions.
                  </li>
                </ol>
                <p>
                  By checking the box below, you acknowledge that you have read
                  the above warning, agree to proceed with full responsibility,
                  and understand that you have waived certain rights by signing
                  this release of liability freely and voluntarily without any
                  external influence.
                </p>

                <span class="btn btn-accent" @click="$emit('close')">
                  Okay, got it!
                </span>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(["close"]);

// function setIsOpen() {
//   emit("close");
// }
</script>
