<template>
  <div class="calc-wrapper">
    <div class="calc-header" data-testid="displayValue">{{ displayValue }}</div>
    <div class="calc-body">
      <div class="col1">
        <button class="btn btn-blue" data-testid="C" @click="clear">
          C
        </button>
        <button
          v-for="n in numButtons"
          :key="n"
          :data-testid="n"
          class="btn"
          @click="handleNumClick(n)"
        >
          {{ n }}
        </button>
      </div>
      <div class="col2">
        <button
          v-for="o in opButtons"
          :key="o"
          :data-testid="o"
          :class="{ btn: true, 'btn-selected': operator === o }"
          @click="handleOperator(o)"
        >
          {{ o }}
        </button>
        <button class="btn btn-green" data-testid="=" @click="calculate">
          =
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      firstValue: '0',
      secondValue: '0',
      operator: null,
      numButtons: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'],
      opButtons: ['/', 'x', '-', '+']
    };
  },
  computed: {
    displayValue() {
      return this.secondValue === '0' ? this.firstValue : this.secondValue;
    }
  },
  methods: {
    handleNumClick(n) {
      if (this.operator === null) {
        if (this.firstValue === '0') {
          this.firstValue = n;
        } else {
          this.firstValue += n;
        }
      } else {
        if (this.secondValue === '0') {
          this.secondValue = n;
        } else {
          this.secondValue += n;
        }
      }
    },
    handleOperator(o) {
      if (this.operator !== null) {
        this.calculate();
      }
      this.operator = o;
    },
    calculate() {
      let num1 = Number(this.firstValue);
      let num2 = Number(this.secondValue);
      if (this.operator === '+') {
        this.firstValue = num1 + num2;
      } else if (this.operator === '-') {
        this.firstValue = num1 - num2;
      } else if (this.operator === 'x') {
        this.firstValue = num1 * num2;
      } else if (this.operator === '/') {
        this.firstValue = num1 / num2;
      }
      this.secondValue = '0';
      this.operator = null;
    },
    clear() {
      this.firstValue = '0';
      this.secondValue = '0';
      this.operator = null;
    }
  }
};
</script>

<style scoped lang="scss">
.calc-wrapper {
  border: 1px solid;
  border-radius: 4px;
  max-width: 350px;
  margin: 0 auto;
}

.calc-body {
  padding: 0.9rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 0.5rem;
  min-height: 300px;
}

.col1 {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  :first-child,
  :last-child {
    grid-column: span 3;
  }
}

.col2 {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
}

.calc-header {
  grid-column: 1 / 5;
  padding: 20px 10px;
  border-bottom: 1px solid;
  text-align: right;
  font-size: 2rem;
}

.btn {
  background: none;
  background-color: #757575;
  border: 1px solid #757575;
  border-radius: 4px;
  color: #fff;
  font-size: 1rem;

  &.btn-green {
    background-color: #9ccc65;
  }

  &.btn-blue {
    background-color: #2196f3;
  }

  &.btn-selected {
    border: 2px solid #333;
  }
}
</style>
