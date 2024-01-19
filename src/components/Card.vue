<template>
  <div class="card">
    <h4 v-if="hasSlot('header')" :class="classNamesHeader">
      <slot name="header" />
    </h4>
    <div v-if="hasSlot('body')" class="card-body">
      <slot name="body" />
    </div>
    <div v-if="hasSlot('footer')" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import SlotMixin from "@/mixins/slot";

export default {
  name: "Card",

  mixins: [SlotMixin],

  props: {
    contextualStyle: {
      default: "primary",
      type: String,
      required: false
    }
  },

  computed: {
    /**
     * @returns {Array} The classes for the header.
     */
    classNamesHeader() {
      const classNames = ["card-header"];

      if (this.contextualStyle) {
        classNames.push(`bg-${this.contextualStyle}`);
        classNames.push("text-white");
      } else {
        classNames.push("bg-default");
      }

      return classNames;
    }
  }
};
</script>
