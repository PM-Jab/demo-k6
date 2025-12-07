define get_config
$(shell jq -r '."$(1)"' makefile.json)
endef



#########################################################
#           /\      |‾‾| /‾‾/   /‾‾/                    #
#      /\  /  \     |  |/  /   /  /                     #
#     /  \/    \    |     (   /   ‾‾\                   #
#    /          \   |  |\  \ |  (‾)  |                  #
#   / __________ \  |__| \__\ \_____/ .io               #
#########################################################
#--------------------------------------------------------
# [CONFIGURABLE]
#--------------------------------------------------------
V_ENV := $(call get_config,V_ENV)

#--------------------------------------------------------
# [DO NOT CHANGE] SMOKE TEST
#--------------------------------------------------------
smoke_test:
	@echo "Running smoke test in $(V_ENV) environment..."
	FILE_PATH="smoke_test.js"; \
	npm run bundle; \
	k6 run $$FILE_PATH; \


#--------------------------------------------------------
# [DO NOT CHANGE] STEP TEST
#--------------------------------------------------------
step_test:
	@echo "Running step test in $(V_ENV) environment..."
	FILE_PATH="step_test.js"; \
	npm run bundle; \
	k6 run $$FILE_PATH;


#--------------------------------------------------------
# [DO NOT CHANGE] STRESS TEST
#--------------------------------------------------------
stress_test:
	@echo "Running stress test in $(V_ENV) environment..."
	FILE_PATH="stress_test.js"; \
	npm run bundle; \
	k6 run $$FILE_PATH; \





#===================================================
# Prerequisite
#===================================================
prerequisite: prerequisite_k6 prerequisite_nodejs prerequisite_pyenv


#===================================================
# Prerequisite for K6
#===================================================
prerequisite_k6:
	@if ! command -v k6 >/dev/null 2>&1; then \
		echo "Installing k6 via brew..."; \
		brew install k6; \
	else \
		echo "k6 is already installed."; \
	fi; \
	echo 'import { Writer } from "k6/x/kafka"; console.log("Kafka extension loaded!");' > temp_check_kafka.js; \
	if k6 run temp_check_kafka.js 2>&1 | grep -q "Kafka extension loaded!"; then \
		echo "Kafka extension is already available in k6."; \
	else \
		echo "Kafka extension not found. Rebuilding k6 with Kafka extension..."; \
		go install go.k6.io/xk6/cmd/xk6@latest; \
		$$HOME/go/bin/xk6 build --with github.com/mostafa/xk6-kafka@latest; \
		cp `which k6` `which k6`.backup; \
		mv k6 `which k6`; \
		k6 run temp_check_kafka.js; \
	fi; \
	rm -f temp_check_kafka.js; \
	echo "Complete!"


#===================================================
# Prerequisite for nodejs
#===================================================
prerequisite_nodejs:
	@if ! command -v node >/dev/null 2>&1; then \
		echo "Node.js not found. Installing via brew..."; \
		brew install node; \
	else \
		echo "Node.js is already installed."; \
	fi
	@echo "Running npm install..."
	@npm install
	@echo "complete!"


#===================================================
# Prerequisite for pyenv
#===================================================
prerequisite_pyenv:
	@echo "Checking if pyenv is installed..."
	@brew list pyenv >/dev/null 2>&1 || brew install pyenv
	@echo "Checking if Python 3.13.4 is already installed in pyenv..."
	@if [ -x "$$HOME/.pyenv/versions/3.13.4/bin/python" ]; then \
		echo "Python 3.13.4 already installed in pyenv. Skipping installation..."; \
	else \
		echo "Installing Python 3.13.4..."; \
		pyenv install 3.13.4; \
	fi
	@echo "Setting up Python 3.13.4 environment..."
	@if [ -d "assets/py/plot-graph-to-image" ]; then \
		( \
			cd assets/py/plot-graph-to-image && \
			$$HOME/.pyenv/versions/3.13.4/bin/python -m ensurepip --upgrade && \
			$$HOME/.pyenv/versions/3.13.4/bin/python -m pip install --upgrade pip && \
			$$HOME/.pyenv/versions/3.13.4/bin/python -m pip install pandas matplotlib pytz openpyxl\
		); \
	else \
		echo "Warning: Directory assets/py/plot-graph-to-image does not exist"; \
	fi
	@echo "complete!"