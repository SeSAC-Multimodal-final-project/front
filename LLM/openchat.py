from llama_cpp import Llama

llm = Llama(model_path="openchat-3.5-7b-mixtral-q4_0.gguf", n_ctx=2048)

# 메시지 리스트
messages = [
    {"role": "user", "content": "형님, 이 모델의 성능이 어느 정도인가요?"},
    {"role": "assistant", "content": "형님, 제가 MT-Bench에서 8.08점을 받았으니 꽤 쓸만하죠!"},
    {"role": "user", "content": "그럼 수학 문제도 잘 풀겠네요?"}
]

# 수동으로 템플릿 적용
prompt = ""
for msg in messages:
    if msg["role"] == "user":
        prompt += f"GPT4 Correct User: {msg['content']}<|end_of_turn>"
    else:
        prompt += f"GPT4 Correct Assistant: {msg['content']}<|end_of_turn>"
prompt += "GPT4 Correct Assistant:"

# 실행
output = llm(prompt, max_tokens=200, temperature=0.7)
print(output["choices"][0]["text"])