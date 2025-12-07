# === All Command ===
#
# make smoke_test
# make step_test
# make stress_test
#
# make fetch_metrics_all
# make fetch_metrics_service_cpu
# make fetch_metrics_service_memory
# make fetch_metrics_db_cpu
# make fetch_metrics_redis_cpu
# make get_resources




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
V_NGINX_NAME := $(call get_config,V_NGINX_NAME)
V_ENV        := $(call get_config,V_ENV)
V_S3_BUCKET := $(call get_config,V_S3_BUCKET)
V_S3_PREFIX := $(call get_config,V_S3_PREFIX)
V_AWS_ACCESS_KEY_ID := $(call get_config,V_AWS_ACCESS_KEY_ID)
V_AWS_SECRET_ACCESS_KEY := $(call get_config,V_AWS_SECRET_ACCESS_KEY)
V_AWS_REGION := $(call get_config,V_AWS_REGION)



#--------------------------------------------------------
# [DO NOT CHANGE]
#--------------------------------------------------------
.PHONY: smoke_test step_test stress_test upload_stress_to_s3
C_REL_PATH := $(shell pwd | sed -n 's|.*\(account-k6-mvp1.0/.*\)|\1|p')
C_REL_PATH_NO_ROOT := $(shell echo $(C_REL_PATH) | sed 's|^account-k6-mvp1.0/||')
C_REL_PATH_DIST := $(shell pwd | sed -n 's|.*\(account-k6-mvp1.0/\)\(.*\)|\1dist/\2|p')
C_REL_PATH_DIST_NO_SRC := $(shell pwd | sed -n 's|.*\(account-k6-mvp1.0/\)\(src/\)\(.*\)|\1dist/\3|p')
C_RUN_ID := $(shell uuidgen)
C_TIMESTAMP := $(shell date "+%Y-%m-%dT%H-%M-%S")
C_PROJECT_ROOT := $(shell git rev-parse --show-toplevel)


#--------------------------------------------------------
# [DO NOT CHANGE] SMOKE TEST
#--------------------------------------------------------
smoke_test:
	@if [ "$(V_ENV)" = "local" ]; then \
		FILE_PATH="smoke_test.js"; \
		npm run bundle; \
		k6 run $$FILE_PATH; \
	else \
		FILE_PATH="smoke_test.js"; \
		DEST_FOLDER="account/$(C_REL_PATH_DIST_NO_SRC)/smoke_test/$(C_TIMESTAMP)"; \
		cd $(C_PROJECT_ROOT) && npm run bundle; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- mkdir -p account/$(C_REL_PATH_DIST_NO_SRC); \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- mkdir -p /account/data; \
		kubectl cp $(C_PROJECT_ROOT)/assets/go/account-data/accounts.csv default/$(V_NGINX_NAME):/account/data/accounts.csv; \
		kubectl cp $(C_REL_PATH_DIST_NO_SRC_NO_ROOT)/$$FILE_PATH default/$(V_NGINX_NAME):account/$(C_REL_PATH_DIST_NO_SRC); \
		kubectl exec -i -t -n default $(V_NGINX_NAME) -c nginx -- \
		env RUN_ID=$(C_RUN_ID) k6 run account/$(C_REL_PATH_DIST_NO_SRC)/$$FILE_PATH; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- \
		mkdir -p $$DEST_FOLDER; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- \
		cp account/tmp/report-$(C_RUN_ID).html $$DEST_FOLDER/01-k6-report.html; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- \
		cp account/tmp/report-$(C_RUN_ID).txt $$DEST_FOLDER/02-k6-report.txt; \
		cd $(C_REL_PATH_NO_ROOT) && mkdir -p ./smoke_test/$(C_TIMESTAMP); \
		kubectl cp default/$(V_NGINX_NAME):$$DEST_FOLDER ./smoke_test/$(C_TIMESTAMP); \
		$(MAKE) utils_create_run_id_file; \
		$(MAKE) utils_create_complete_time_file; \
		$(MAKE) utils_extract_options FILE=smoke_test.js; \
	fi


#--------------------------------------------------------
# [DO NOT CHANGE] STEP TEST
#--------------------------------------------------------
step_test:
	@if [ "$(V_ENV)" = "local" ]; then \
		FILE_PATH="step_test.js"; \
		npm run bundle; \
		k6 run $$FILE_PATH; \
	else \
		FILE_PATH="step_test.js"; \
		DEST_FOLDER="account/$(C_REL_PATH_DIST_NO_SRC)/step_test/$(C_TIMESTAMP)"; \
		cd $(C_PROJECT_ROOT) && npm run bundle; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- mkdir -p account/$(C_REL_PATH_DIST_NO_SRC); \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- mkdir -p /account/data; \
		kubectl cp $(C_PROJECT_ROOT)/assets/go/account-data/accounts.csv default/$(V_NGINX_NAME):/account/data/accounts.csv; \
		kubectl cp $(C_REL_PATH_DIST_NO_SRC_NO_ROOT)/$$FILE_PATH default/$(V_NGINX_NAME):account/$(C_REL_PATH_DIST_NO_SRC); \
		kubectl exec -i -t -n default $(V_NGINX_NAME) -c nginx -- \
		env RUN_ID=$(C_RUN_ID) k6 run account/$(C_REL_PATH_DIST_NO_SRC)/$$FILE_PATH; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- \
		mkdir -p $$DEST_FOLDER; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- \
		cp account/tmp/report-$(C_RUN_ID).html $$DEST_FOLDER/01-k6-report.html; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- \
		cp account/tmp/report-$(C_RUN_ID).txt $$DEST_FOLDER/02-k6-report.txt; \
		cd $(C_REL_PATH_NO_ROOT) && mkdir -p ./step_test/$(C_TIMESTAMP); \
		kubectl cp default/$(V_NGINX_NAME):$$DEST_FOLDER ./step_test/$(C_TIMESTAMP); \
		$(MAKE) utils_create_run_id_file; \
		$(MAKE) utils_create_complete_time_file; \
		$(MAKE) utils_extract_options FILE=step_test.js; \
	fi


#--------------------------------------------------------
# [DO NOT CHANGE] STRESS TEST
#--------------------------------------------------------
stress_test:
	@if [ "$(V_ENV)" = "local" ]; then \
		FILE_PATH="stress_test.js"; \
		npm run bundle; \
		k6 run $$FILE_PATH; \
	else \
		FILE_PATH="stress_test.js"; \
		DEST_FOLDER="account/$(C_REL_PATH_DIST_NO_SRC)/stress_test/$(C_TIMESTAMP)"; \
		cd $(C_PROJECT_ROOT) && npm run bundle; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- mkdir -p account/$(C_REL_PATH_DIST_NO_SRC); \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- mkdir -p /account/data; \
		kubectl cp $(C_PROJECT_ROOT)/assets/go/account-data/accounts.csv default/$(V_NGINX_NAME):/account/data/accounts.csv; \
		kubectl cp $(C_REL_PATH_DIST_NO_SRC_NO_ROOT)/$$FILE_PATH default/$(V_NGINX_NAME):account/$(C_REL_PATH_DIST_NO_SRC); \
		kubectl exec -i -t -n default $(V_NGINX_NAME) -c nginx -- \
		env RUN_ID=$(C_RUN_ID) k6 run account/$(C_REL_PATH_DIST_NO_SRC)/$$FILE_PATH; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- \
		mkdir -p $$DEST_FOLDER; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- \
		cp account/tmp/report-$(C_RUN_ID).html $$DEST_FOLDER/01-k6-report.html; \
		kubectl exec -n default $(V_NGINX_NAME) -c nginx -- \
		cp account/tmp/report-$(C_RUN_ID).txt $$DEST_FOLDER/02-k6-report.txt; \
		cd $(C_REL_PATH_NO_ROOT) && mkdir -p ./stress_test/$(C_TIMESTAMP); \
		kubectl cp default/$(V_NGINX_NAME):$$DEST_FOLDER ./stress_test/$(C_TIMESTAMP); \
		$(MAKE) utils_create_run_id_file; \
		$(MAKE) utils_create_complete_time_file; \
		$(MAKE) utils_extract_options FILE=stress_test.js; \
	fi










#########################################################
#     __    __                                          #
#    /  \  /  \      ____                  _            #
#   /    \/    \    / ___| _ __ __ _ _ __ | |__         #
#   \          /   | |  _ | '__/ _` | '_ \| '_ \        #
#    \        /    | |_| || | | (_| | |_) | | | |       #
#     \__/\__/      \____||_|  \__,_| .__/|_| |_|       #
#                                    |_|                #
#########################################################
#--------------------------------------------------------
# [CONFIGURABLE]
#--------------------------------------------------------
V_PROFILE        := $(call get_config,V_PROFILE)
V_REGION         := $(call get_config,V_REGION)
V_CLUSTER_NAME   := $(call get_config,V_CLUSTER_NAME)
V_NAMESPACE      := $(call get_config,V_NAMESPACE)
V_SERVICE        := $(call get_config,V_SERVICE)
V_DB_INSTANCE    := $(call get_config,V_DB_INSTANCE)
V_REDIS_INSTANCE := $(call get_config,V_REDIS_INSTANCE)
V_WAIT_TIME      := $(call get_config,V_WAIT_TIME)


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