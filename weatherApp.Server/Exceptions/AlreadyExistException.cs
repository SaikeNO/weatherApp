﻿namespace weatherApp.Server.Exceptions;

public class AlreadyExistException(string message) : Exception(message)
{
}
