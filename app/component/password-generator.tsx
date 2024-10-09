"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState, ChangeEvent } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncLowercase] = useState<boolean>(true);
  const [includeSymbol, setIncSymbol] = useState<boolean>(true);
  const [includeNumber, setIncNumber] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLength(parseFloat(e.target.value));
  };

  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (checked: CheckedState): void => {
      if (typeof checked === "boolean") {
        setter(checked);
      }
    };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(password).then(
      () => {
        alert("copied successful");
      },
      (error) => {
        alert("Failed to copy to the clipboard.");
        console.log(error);
      }
    );
  };
  const generatePassword = ():void=>{
     //define character set
  
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let allChars = ""
  if(includeUppercase) allChars += uppercaseChars;
  if(includeLowercase) allChars += lowercaseChars;
  if(includeNumber) allChars += numberChars;
  if(includeSymbol) allChars += symbolChars;

  if(allChars === ""){
    alert("Please select atleast one character type.")
    return;
  }

  let generatedPassword = "";
  for(let i=0;i<length;i++){
    const randomIndex = Math.floor(Math.random() * allChars.length);
    generatedPassword += allChars[randomIndex]
  }
  setPassword(generatedPassword)
  }
 
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="mx-auto max-w-md space-y-6">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold">
              Password Generator
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">
              Create a secure password with just a few clicks.
            </CardDescription>
          </CardHeader>
        </div>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pass-length">Password Length</Label>
            <Input
              id="pass-length"
              type="number"
              min="8"
              max="32"
              value={length}
              placeholder="Enter password length"
              required
              onChange={handleLengthChange}
              className="w-full"

            />
          </div>
          <div className="space-y-2">
            <Label>Include:</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={handleCheckboxChange(setIncUppercase)}
              />
              <Label htmlFor="uppercase">Uppercase Letters</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={handleCheckboxChange(setIncLowercase)}
              />
              <Label htmlFor="lowercase">Lowercase Letters</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="number"
                checked={includeNumber}
                onCheckedChange={handleCheckboxChange(setIncNumber)}
              />
              <Label htmlFor="number">Number Letters</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbol"
                checked={includeSymbol}
                onCheckedChange={handleCheckboxChange(setIncSymbol)}
              />
              <Label htmlFor="symbol">Symbol Letters</Label>
            </div>
          </div>
          <Button className="w-full max-w-lg rounded-full" onClick={generatePassword}> 
            Generate Password
          </Button>
        </CardContent>
        <div className="flex flex-col space-y-1">
          <Label htmlFor="password">Generated Password</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="password"
              type="text"
              value={password}
              readOnly
              className="flex-1"
            />
            <Button type="button" onClick={copyToClipboard}>
              Copy to Clipboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
