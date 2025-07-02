# Development Guide

#### **1. Clone Repository**

```bash
git clone https://github.com/worryzyy/element-ui-x.git
cd element-ui-x
```

#### **2. Install Dependencies**

```bash
# Recommended to use NPM for dependency management
npm install:all
```

#### **3. Project Structure**

- docs: Documentation site

- examples: Demo project

- packages/element-ui-x: Component library project source code, **this project must be built first before debugging**

The following is the main **`project directory structure`**. Please check it first to help you understand the project directory

```plaintext
├── .github                     # CI/CD configuration
├── docs                        # Documentation source code (based on VuePress 1.x, really don't use this)
├── examples                    # Demo source code
├── packages
│   └── element-ui-x            # Component source code
|       ├──build                # Build configuration
|       └──src
|          ├──— components      # Component core source code
|          |    ├── Bubble      # Bubble component
|          |    ├── BubbleList  # Bubble list
|          |    ├── Sender      # Input box
|          |    ├── Typewriter  # Typewriter component
|          |    └── ...         # More components
|          └── styles           # Component styles
|          └── utils            # Utility functions
|          └── mixins           # Mixins
|
|
└── package.json                # Project configuration
```

#### **4. Development Commands**

**Please build the components first before executing preview**

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run build:lib`    | Build production version locally |
| `npm run dev:examples` | Start component preview          |
| `npm run dev:docs`     | Preview documentation locally    |

#### **5. Become a Contributor**

> Welcome to join our discussion group

> Looking forward to communicating and learning with you, and improving the project together

1. **Create your own branch**:

   Branch management is particularly important, we adopt the following process:

   master(main branch) ← dev(development branch) ← feature(feature branch)

   ```bash
   git checkout -b feature/new-component (new-component is your branch name)
   ```

2. **Code Standards**:

   - Component naming follows `PascalCase` convention

   - Each component contains:

   ```plaintext
   ├── src            # Component root directory
   |   └──components  # Sub-components (if any)
   |   └──main.vue
   ├── index.js       # Component entry
   ```

3. **Submit PR**:

   - Title format: `feat(component): Add typewriter component`
   - Description includes: feature description, usage examples, change impact

4. **Review**:

   **PR Review Workflow**:

   ```
   Submit PR → Check validity → Approve submission → Create new branch → Merge code → Local pull review → Feedback results
                ↓              ↓           ↓         ↓         ↓           ↓
             Invalid reject   Pass approval   New branch creation   Code merge   Local run    ├─ Pass: Merge
                                                                      └─ Improve: Feedback suggestions
   ```

   **Process Description**:

   - We will carefully review the validity and necessity of each PR
   - After passing the review, we will create a dedicated feature branch for you
   - Merge your code into the feature branch for testing
   - Run locally and verify functional integrity
   - Provide detailed feedback and suggestions within 24 hours
   - If the test passes, the code will be merged into the development branch

   We encourage developers to boldly submit creative ideas and work together to build a better component library!

#### **6. Debug Local Package**

Link local code in the example project:

Modify the dependency version number in `docs/package.json` and `examples/package.json` files:

```json
"dependencies": {
    "vue-element-ui-x": "file:../packages/element-ui-x",
  },
```

```bash
# Build locally first
npm run build:lib

# Run example project
npm run dev:examples
```
