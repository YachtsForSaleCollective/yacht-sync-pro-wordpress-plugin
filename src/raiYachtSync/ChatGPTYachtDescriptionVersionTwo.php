<?php
	class raiYachtSync_ChatGPTYachtDescriptionVersionTwo {

		public function __construct() {

			$this->options = new raiYachtSync_Options();



		}

		public function add_actions_and_filters() {


		}

		
		public function make_description($context) {

			$gpt_messages = [
				['role' => 'system', 'content' => 'You are a SEO content writer with the purpose of selling yachts and boats.']
			];

			$gpt_messages[] = ['role' => 'system', 'content' => 'Read This For Context. '.$context];

			$gpt_messages[] = ["role" => "assistant", "content" => "Write a meta description within 160 characters from the context above. Do not return a response with quotation marks."];

			$gpt_headers = [
				'headers' => [
					'Authorization' => 'Bearer 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',
					'Content-Type' => 'application/json',
				],

				'timeout' => 120,

				'body' => json_encode([
					"model" => "gpt-4",
					"messages" => $gpt_messages
				])
			];

			$gpt_url = "https://api.openai.com/v1/chat/completions";

			$gpt_call = wp_remote_post($gpt_url, $gpt_headers);

			$gpt_body = json_decode(wp_remote_retrieve_body($gpt_call), true);

			return ($gpt_body['choices'][0]['message']['content']);

		}

	}