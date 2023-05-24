import aiassist

question1 = "Analyze the average emotion of the following list. just return one word as the response. [ i will never buy it, the sheer amount of pressure in wearing it is bad]"
req = aiassist.Completion.create(prompt=question1)
answer = req["text"]
print(answer)