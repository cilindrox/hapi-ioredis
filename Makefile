
NODE_MODULES=node_modules/.bin

STANDARD=$(NODE_MODULES)/standard

ISTANBUL=$(NODE_MODULES)/istanbul

COVERALLS=$(NODE_MODULES)/coveralls
COVERAGE_REPORT=coverage/lcov.info
COVERAGE_PCT=90

MOCHA=$(NODE_MODULES)/_mocha
TESTS=$(test)

lint:
	@$(STANDARD)

test: lint
	@$(MOCHA) $(TESTS)

cover: clean-cov
	@$(ISTANBUL) cover $(MOCHA) --report html -- \
		--reporter dot $(TESTS)

test-cov: clean-cov
	@$(ISTANBUL) cover $(MOCHA) --report lcovonly -- \
		--reporter dot $(TESTS) \
		&& cat ./coverage/lcov.info | $(COVERALLS) \
		&& rm -rf ./coverage

check-coverage:
	@$(ISTANBUL) check-coverage \
		--statements $(COVERAGE_PCT) \
		--functions $(COVERAGE_PCT) \
		--branches $(COVERAGE_PCT) \
		--lines $(COVERAGE_PCT)

clean-cov:
	@rm -rf ./coverage

clean: clean-cov
	@rm -rf ./node_modules *.heapsnapshot


.PHONY: test
