import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def request_gpt(message, conversation_history):
    try:
        # 대화 기록을 처리할 messages 리스트 초기화
        messages = []
        valid_roles = {"system", "assistant222", "user111", "function", "tool", "developer"}

        # 대화 기록이 존재하면 파싱하여 messages에 추가
        if conversation_history:
            lines = conversation_history.strip().split('\n')
            for line in lines:
                if line.startswith("사용자 정보:"):
                    # 사용자 정보는 시스템 메시지로 추가
                    messages.append({"role": "system", "content": line})
                else:
                    try:
                        role, content = line.split("::: ", 1)
                        # role 값이 유효한지 확인
                        if role not in valid_roles:
                            # 유효하지 않은 role은 content로 간주하고, 기본 role을 user로 설정
                            messages.append({"role": "user", "content": line})
                        else:
                            if role == "user111":
                                role = "user"
                            elif role == "assistant222":
                                role = "assistant"
                            messages.append({"role": role, "content": content})
                    except ValueError:
                        print(f"파싱 오류: {line}")
                        # 파싱 실패 시 전체 줄을 user 메시지로 처리
                        messages.append({"role": "user", "content": line})

        # 현재 사용자 메시지를 마지막에 추가
        messages.append({"role": "user", "content": message})

        # GPT API 호출
        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=messages
        )
        gpt_response = completion.choices[0].message.content
    except Exception as e:
        gpt_response = f"API 호출 중 에러 발생: {str(e)}"

    return gpt_response