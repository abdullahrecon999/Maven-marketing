import deepai

resp = ""
for chunk in deepai.Completion.create("Who are you?"):
    resp += chunk
print(resp)